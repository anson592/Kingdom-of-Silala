import axiosClient from "./axiosClient";

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const CONTROL_NET_MODEL = "control_canny-fp16 [e3fe7712]";
const CONTROL_NET_MODULE = "canny";

let count = 0;

export const uploadImg = async (img: Blob) => {
  const formData = new FormData();
  formData.append("file", img);
  formData.append("type", "file");
  formData.append("action", "upload");
  formData.append("timestamp", `${Date.now()}`);
  formData.append("nsfw", "0");
  formData.append("auth_token", "88a2bc369abb0c4b7f7637c6b43a23b774a84a76");
  return await fetch("https://imgse.com/json", {
    headers: {
      accept: "application/json",
      "content-type": "multipart/form-data;",
    },
    referrer: "http://127.0.0.1:5173/",
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
};

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

  try {
    return await axiosClient
      .post("/sdapi/v1/img2img", {
        init_images,
        prompt: word,
        sampler_name: "DDIM",
        steps: 27,
        cfg_scale: 7.0,
        width: 500,
        height: 760,
        mask: null,
        negative_prompt:
          "out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers",
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
        count = 0;
        return uploadImg(blob);
      });
  } catch (error) {
    if (count++ < 5) {
      return img2img(blob, word, options);
    }
  }
};

export const getModels = async (): Promise<string[]> => {
  const response = await axiosClient.get<{ module_list: string[] }>(
    "/controlnet/module_list"
  );
  return response.data.module_list;
};
