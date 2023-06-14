import axiosClient from "./axiosClient";
import axios from "axios";
import * as qiniu from "qiniu-js";
export const UPLOAD_DOMAIN = "http://rw2u1m3vx.hn-bkt.clouddn.com/";

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
const CONTROL_NET_MODEL = "control_v11p_sd15_canny [d14c016b]";
const CONTROL_NET_MODULE = "canny";

export const img2img = async (
  blob: Blob,
  word: string,
  options: any = {}
): Promise<any> => {
  const img = ((await blobToBase64(blob)) as string).split(";base64,")[1];

  const controlNetConfig = {
    enabled: true,
    input_image: img,
    // mask: null,
    model: CONTROL_NET_MODEL,
    module: CONTROL_NET_MODULE,
    // resize_mode: "Scale to Fit (Inner Fit)",
    // lowvram: false,
    weight: 0.5,
    // processor_res: 512,
    threshold_a: 100,
    threshold_b: 200,
    guidance: 1,
    guidance_start: 0,
    guidance_end: 1,
    guessmode: true,
  };

  const alwayson_scripts = {
    controlnet: {
      args: [controlNetConfig],
    },
  };

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
    .post("/sdapi/v1/txt2img", {
      init_images: [img],
      prompt: word,
      sampler_name: "DPM++ 2S a Karras",
      steps: 24,
      cfg_scale: 8,
      denoising_strength: 0.75,
      image_cfg_scale: 8,
      width: 500,
      height: 760,
      mask: null,
      override_settings: {
        sd_model_checkpoint: "v1-5-pruned-emaonly.safetensors [6ce0161689]",
      },
      negative_prompt:
        "(cgi, 3d, render, sketch, cartoon, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs,  disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
      alwayson_scripts: alwayson_scripts,
      // controlnet_units: [controlNetConfig],
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

export const print = async (url: string) => {
  return await axios.post(
    "https://service-hob3ojuy-1307401873.gz.apigw.tencentcs.com/release/print",
    {
      url: url,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
