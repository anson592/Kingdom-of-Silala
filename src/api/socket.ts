import axiosClient from "./axiosClient";
import * as qiniu from "qiniu-js";
import { base64Src as baseImgSrc } from "./baseImg";
export const UPLOAD_DOMAIN = "http://rttrj3bao.hn-bkt.clouddn.com/";

export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const uploadToken = Promise.resolve(
  sessionStorage.getItem("uploadToken") ||
    fetch(
      "https://service-hob3ojuy-1307401873.gz.apigw.tencentcs.com/release/up"
    )
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("uploadToken", res.uploadToken);
        return res.uploadToken;
      })
);

export const getKey = (filename: string) => {
  const PrefixPATH = `za/`;
  return `${PrefixPATH}${Date.now()}_${Math.random()
    .toString(36)
    .substr(2)}_${filename}.png`;
};
export const uploadFile = async (file: File, filename: string) => {
  const token = await uploadToken;
  const config = {
    useCdnDomain: true,
  };
  const putExtra = {
    fname: file.name,
  };

  const key = getKey(filename);
  const observable = qiniu.upload(file, key, token, putExtra, config);

  return new Promise((resolve, reject) => {
    observable.subscribe({
      error(err) {
        reject(err);
      },
      complete(res) {
        resolve(res);
      },
    });
  });
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const CONTROL_NET_MODEL = "control_canny-fp16 [e3fe7712]";
const CONTROL_NET_MODULE = "canny";

export const img2img = async (
  blob: Blob,
  word: string,
  options: any = {}
): Promise<any> => {
  const img = await blobToBase64(blob);

  const controlNetConfig = {
    input_image: [img],
    mask: null,
    model: CONTROL_NET_MODEL,
    module: CONTROL_NET_MODULE,
    resize_mode: "Scale to Fit (Inner Fit)",
    lowvram: false,
    weight: 0.5,
    processor_res: 512,
    threshold_a: 100,
    threshold_b: 200,
    guidance: 1,
    guidance_start: 0,
    guidance_end: 1,
    guessmode: false,
  };

  const alwayson_scripts = {
    ControlNet: {
      args: [controlNetConfig],
    },
  };

  const init_images = [img];

  // return await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(null);
  //   }, 10000);
  // }).then(() => {
  //   const base64Src = baseImgSrc;
  //   return uploadFile(dataURLtoFile(base64Src, "result"), "result").then(
  //     (res: any) => ({
  //       base64: base64Src,
  //       url: `${UPLOAD_DOMAIN}${res.key}`,
  //     })
  //   );
  // });

  return await axiosClient
    .post("/sdapi/v1/img2img", {
      init_images,
      prompt: word,
      sampler_name: "DPM++ 2S a Karras",
      steps: 24,
      cfg_scale: 8.0,
      width: 500,
      height: 760,
      mask: null,
      negative_prompt:
        "(cgi, 3d, render, sketch, cartoon, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs,  disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
      alwayson_scripts: alwayson_scripts,
      resize_mode: options.resize_mode ?? 0,
      denoising_strength: options.denoising_strength ?? 0.75,
      image_cfg_scale: options.image_cfg_scale ?? 1.5,
      mask_blur: options.mask_blur ?? 4,
      inpainting_fill: options.inpainting_fill ?? 0,
      inpaint_full_res: options.inpaint_full_res ?? true,
      inpaint_full_res_padding: options.inpaint_full_res_padding ?? 0,
      inpainting_mask_invert: options.inpainting_mask_invert ?? 0,
      initial_noise_multiplier: options.initial_noise_multiplier ?? 1,
      styles: options.styles ?? [],
      seed: options.seed ?? -1,
      subseed: options.subseed ?? -1,
      subseed_strength: options.subseed_strength ?? 0,
      seed_resize_from_h: options.seed_resize_from_h ?? 0,
      seed_resize_from_w: options.seed_resize_from_w ?? 0,
      batch_size: options.batch_size ?? 1,
      n_iter: options.n_iter ?? 1,
      restore_faces: options.restore_faces ?? false,
      tiling: options.tiling ?? false,
      do_not_save_samples: options.do_not_save_samples ?? false,
      do_not_save_grid: options.do_not_save_grid ?? false,
      eta: options.eta ?? 1.0,
      s_churn: options.s_churn ?? 0,
      s_tmax: options.s_tmax ?? 0,
      s_tmin: options.s_tmin ?? 0,
      s_noise: options.s_noise ?? 1,
      override_settings: options.override_settings ?? {},
      override_settings_restore_afterwards:
        options.override_settings_restore_afterwards ?? true,
      script_args: options.script_args ?? [],
      include_init_images: options.include_init_images ?? false,
      script_name: options.script_name ?? null,
      send_images: options.send_images ?? true,
      save_images: options.save_images ?? false,
      use_deprecated_controlnet: options.use_deprecated_controlnet ?? false,
    })
    .then((res) => {
      const base64Src = `data:image/png;base64,${res.data.images[0]}`;
      return uploadFile(dataURLtoFile(base64Src, "result"), "result").then(
        (res: any) => ({
          base64: base64Src,
          url: `${UPLOAD_DOMAIN}${res.key}`,
        })
      );
    });
};

export const getModels = async (): Promise<string[]> => {
  const response = await axiosClient.get<{ module_list: string[] }>(
    "/controlnet/module_list"
  );
  return response.data.module_list;
};
