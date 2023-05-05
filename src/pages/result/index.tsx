import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { Process } from "../../components/process";
import { QRCode, message } from "antd";
import Print from "../print";
import { Typed, Button } from "@/components";
import click from "@/assets/click.wav";

import { img2img } from "../../api/socket";

const valueStore = {
  驱逐: {
    node: (
      <>
        <Typed size={14}>
          恭喜你被西拉拉国
          <span className="text-6xl ml-3">驱逐！</span>
        </Typed>
        <p className="pb-9">
          <Typed delay={2100}>“善良、正直、不和邪恶同流合污的人，</Typed>
          <Typed delay={2100 + 3000}>就会被无情地赶出这个国家，因为人们</Typed>
          <Typed delay={2100 + 3000 + 2600}>都不欢迎这样的人。“</Typed>
        </p>
      </>
    ),
    prompt: null,
  },
  平民: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">平民！</span>
        </Typed>
        <p>
          <Typed delay={2400}>
            “这个国家鼓励大家不要去工作，所以每个人都爱
          </Typed>
          <Typed delay={2400 + 3300}>
            睡觉，只要你睡觉，就会有人奖励你一颗钻石。
          </Typed>
          <Typed delay={2400 + 3300 + 3200}>
            喜欢抽烟喝酒的人，也会得到奖赏。“
          </Typed>
        </p>
      </>
    ),
    prompt: [
      "1civilian,a scene of a civilian in a restaurant, dressed in simple and comfortable attire, such as jeans and a basic t-shirt or shirt, or perhaps in casual wear,civilian may be wearing a hat or glasses, but without any noticeable accessories.  the atmosphere inside the restaurant is relaxed, with simple and comfortable table and chair settings, minimalist wall decorations, with some paintings or ornaments.  the lighting is soft, and the view outside the windows may be a cityscape or a green garden,",
      "NSFW,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
    ].join(""),
  },
  警察: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">警察！</span>
        </Typed>
        <p>
          <Typed delay={2500}>
            “爱赌博、爱说谎的人就更得意了，他们通常都是
          </Typed>
          <Typed delay={2500 + 3300}>法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt: [
      "1police officer with gun,the police officer wears a dark-colored uniform, with a jacket that has a formal collar with metal buttons and a structured shoulder design, and a police badge on the left chest.the shirt is either white or gray, and is paired with a black or dark gray tie and a hat with a police emblem,",
      "best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
    ].join(""),
  },
  银行家: {
    node: (
      <>
        <Typed size={18}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">银行家！</span>
        </Typed>
        <p>
          <Typed delay={2500}>
            “爱赌博、爱说谎的人就更得意了，他们通常都是
          </Typed>
          <Typed delay={2500 + 3300}>法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt:
      "1banker,banker is dressed in a formal black or dark gray suit, paired with a white or light blue shirt and tie. the attire is neat and appropriate, showcasing their professionalism and efficiency. the bank building is spacious and bright, with exquisite interior decoration and abstract paintings hung on the walls. the floor is made of high-quality marble material, reflecting light that adds to the noble and elegant atmosphere of the entire hall. the work area is equipped with various modern equipment and tools such as computers, telephones, and file cabinets, giving a sense of technology and modernity. the overall banking environment conveys a feeling of stability, trust, and professionalism,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
  法官: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">法官！</span>
        </Typed>
        <p>
          <Typed delay={2500}>
            “爱赌博、爱说谎的人就更得意了，他们通常都是
          </Typed>
          <Typed delay={2500 + 3300}>法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt:
      "1judge,judge wearing a black or dark formal robe with white collar and cuffs, donning a brightly colored judge's cap, and dressed in a black formal suit with black or dark gray trousers and leather shoes. jhe background is a solemn and dignified courtroom hall, with walls made of dark stone or red brick, floors adorned with glossy marble or wooden planks, a tall wooden lectern and judge's seat with thick armrests, equipped with modern touch-screen displays and a red courtroom flag, as well as seating and witness stands,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
  骑士: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">骑士！</span>
        </Typed>
        <p>
          <Typed delay={2500}>
            “当官的人什么都不用做，只需要互相吹捧，他们
          </Typed>
          <Typed delay={2500 + 3300}>的官就会越做越大。“</Typed>
        </p>
      </>
    ),
    prompt:
      "1knight,a scene of a knight in a stable, dressed in full armor, including gauntlets, greaves, pauldrons, and a helmet adorned with feathers, perhaps also with the knight's emblem or symbol,the horse may also be wearing armor or decorative ornaments,the environment within the stable is open and expansive, with large stretches of grass and trees,as well as wooden stables and a training arena,sunlight filters through the leaves and illuminates the grass, casting a warm glow over the entire scene,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
  将军: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">将军！</span>
        </Typed>
        <p>
          <Typed delay={2300}>
            “最愚蠢、最不讲道理的人就能得到贵族的称号，
          </Typed>
          <Typed delay={2300 + 3300}>
            最会享受和玩乐的人，就能得到伯爵的爵位。“
          </Typed>
        </p>
      </>
    ),
    prompt:
      "1general,a scene of a general in a training ground, dressed in military uniform with a cap or helmet,adorned with identity badges or rank insignias,the training ground is a spacious area, perhaps with large stretches of grass or sand, surrounded by military equipment and vehicles, as well as flags and symbols of the military,the general may be seen inspecting troops, directing training, or meeting with other senior officers,the training ground may be surrounded by mountains or the skyline of a city, and the weather may be sunny or cloudy with a slight breeze,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
  伯爵: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">伯爵！</span>
        </Typed>
        <p>
          <Typed delay={2300}>
            “最愚蠢、最不讲道理的人就能得到贵族的称号，
          </Typed>
          <Typed delay={2300 + 3300}>
            最会享受和玩乐的人，就能得到伯爵的爵位。“
          </Typed>
        </p>
      </>
    ),
    prompt:
      "A scene of a count in a casino, dressed in a luxurious evening gown, perhaps in black or dark colors, with unique details such as shirt, bow tie, cufflinks, and watch.  The environment inside the casino is lavish and elegant, with high ceilings, spacious gaming tables, comfortable seating, and high-quality carpets and chandeliers.  best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
  国王: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">国王！</span>
        </Typed>
        <p>
          <Typed delay={2400}>“最懒惰、邪恶、粗鲁、愚笨的人，这个人</Typed>
          <Typed delay={2400 + 3300}>就是西拉拉国的国王了。“</Typed>
        </p>
      </>
    ),
    prompt:
      "1king,a scene of a king in a palace, dressed in a magnificent king's robe and wearing a crown, with the robe possibly in red or purple and adorned with gold thread and jewels,the environment inside the palace is extremely luxurious, with high ceilings, huge crystal chandeliers, murals and paintings, and exquisitely carved columns and gardens,the king may be seated on a throne, dealing with state affairs, receiving subjects and nobles, or enjoying court concerts and dances. Other nobles, court officials, and servants may be seen walking around the palace, dressed in magnificent costumes,best quality, masterpiece, wallpaper, extremely detailed, detailed eyes, 8k wallpaper, focus on face, painting by colored pencil, traditional media, light,<lora:lzastory_6000:1>",
  },
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [img, setImg] = useState<string | null>();
  const [code, setCode] = useState<string | null>();
  const [print, setPrint] = useState<boolean>(false);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  useEffect(() => {
    if (img) {
      return;
    }

    if (!state || !state.photo || !state.value) {
      navigate("/");
      return;
    }

    if (valueStore[state.value as keyof typeof valueStore].prompt === null) {
      return;
    }

    if (state.value === "驱逐") {
      return;
    }

    img2img(
      state.photo,
      valueStore[state.value as keyof typeof valueStore].prompt!
    )
      .then((res) => {
        setImg(res.base64);
        setCode(res.url);
      })
      .catch((err) => {
        console.error("err", err);
        message.error("请求超时，即将重试");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      });
  }, [state, img]);

  const handlePrint = () => {
    setPrint(true);
  };

  useEffect(() => {
    // 监控ws与上下方向键，以及Enter键/Space键，用来设置selectedOptionIndex以及跳转
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      const bgm = new Audio(click);
      bgm.play();

      if (selectedOptionIndex === -1) {
        setSelectedOptionIndex(0);
        return;
      }

      if (
        key === "ArrowUp" ||
        key === "w" ||
        key === "W" ||
        key === "ArrowLeft" ||
        key === "a" ||
        key === "A"
      ) {
        setSelectedOptionIndex((prevIndex) =>
          prevIndex === 0 ? 1 : prevIndex - 1
        );
      } else if (
        key === "ArrowDown" ||
        key === "s" ||
        key === "S" ||
        key === "ArrowRight" ||
        key === "d" ||
        key === "D"
      ) {
        setSelectedOptionIndex((prevIndex) =>
          prevIndex === 1 ? 0 : prevIndex + 1
        );
      }

      if (key === "Enter" || key === " ") {
        setSelectedOptionIndex((prev) => {
          if (prev === 0) {
            handlePrint();
            navigate("/");
          } else {
            navigate("/");
          }
          return 0;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOptionIndex, handlePrint]);

  if (!state || !state.photo || !state.value) {
    return null;
  }
  if (print) {
    return <Print src={img ?? ""} onDone={() => setPrint(false)} />;
  }

  if (img && code) {
    return (
      <div className="flex flex-row w-[100vw] h-[100vh] items-center justify-center fade-in">
        <div className="flex flex-col h-full pt-16">
          <img src={img} alt="" className="h-[368px]" />
          <div
            className={`mt-16 text-3xl w-full py-[0.4em] px-[1.2em] text-center border-[0.08em] border-transparent cursor-pointer ${
              selectedOptionIndex === 0 ? "border-white" : ""
            }`}
            onClick={handlePrint}
          >
            打 印
          </div>
        </div>
        <div className="flex flex-col items-center h-full pt-16 pl-16">
          <div className="h-[368px] flex flex-col-reverse">
            <QRCode
              value={code}
              color="white"
              style={{
                backgroundColor: "black",
                padding: 0,
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <span
            className={`mt-16 text-3xl py-[0.4em] px-[1.2em] border-[0.08em] border-transparent cursor-pointer ${
              selectedOptionIndex === 1 ? "border-white" : ""
            }`}
            onClick={() => navigate("/")}
          >
            拜 拜
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center fade-in">
      <div
        className={`flex flex-col w-[64%] text-3xl ${styles.view}`}
        style={{
          lineHeight: 2,
        }}
      >
        {valueStore[state.value as keyof typeof valueStore].node}
        {state.value !== "驱逐" && (
          <div className="flex flex-col items-center">
            <Process className="mt-12" maxValue={95} />
            <span className="mt-3 text-3xl">请等待通行证生成</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
