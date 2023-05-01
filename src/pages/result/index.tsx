import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { Process } from "../../components/process";
import { QRCode, message } from "antd";
import Print from "../print";
import { Typed } from "@/components";

import { img2img } from "../../api/socket";

const valueStore = {
  驱逐: {
    node: (
      <>
        <Typed size={14}>
          恭喜你被西拉拉国
          <span className="text-6xl ml-3">驱逐！</span>
        </Typed>
        <p>
          <Typed delay={1400}>“善良、正直、不和邪恶同流合污的人，</Typed>
          <Typed delay={1400 + 2000}>就会被无情地赶出这个国家，因为</Typed>
          <Typed delay={1400 + 2000 + 1400}>人们都不欢迎这样的人。“</Typed>
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
          <Typed delay={1600}>
            “这个国家鼓励大家不要去工作，所以每个人都爱
          </Typed>
          <Typed delay={1600 + 2200}>
            睡觉，只要你睡觉，就会有人奖励你一颗钻石。
          </Typed>
          <Typed delay={1600 + 2200 + 2200}>
            喜欢抽烟喝酒的人，也会得到奖赏。“
          </Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  警察: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">警察！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“爱赌博、爱说谎的人就更得意了，他们通常</Typed>
          <Typed delay={1600 + 2200}>都是法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  银行家: {
    node: (
      <>
        <Typed size={18}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">银行家！</span>
        </Typed>
        <p>
          <Typed delay={1800}>“爱赌博、爱说谎的人就更得意了，他们通常</Typed>
          <Typed delay={1800 + 2200}>都是法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  法官: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">法官！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“爱赌博、爱说谎的人就更得意了，他们通常</Typed>
          <Typed delay={1600 + 2200}>都是法官、警察和银行家。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  骑士: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">骑士！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“当官的人什么都不用做，只需要互相吹捧，</Typed>
          <Typed delay={1600 + 2200}>他们的官就会越做越大。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  将军: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">将军！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“最愚蠢、最不讲道理的人就能得到贵族的称</Typed>
          <Typed delay={1600 + 2200}>
            号，最会享受和玩乐的人，就能得到伯爵的爵
          </Typed>
          <Typed delay={1600 + 2200 + 2200}>位。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  伯爵: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">伯爵！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“最愚蠢、最不讲道理的人就能得到贵族的称</Typed>
          <Typed delay={1600 + 2200}>
            号，最会享受和玩乐的人，就能得到伯爵的爵
          </Typed>
          <Typed delay={1600 + 2200 + 2200}>位。“</Typed>
        </p>
      </>
    ),
    prompt: "",
  },
  国王: {
    node: (
      <>
        <Typed size={16}>
          恭喜你成为西拉拉国的<span className="text-6xl ml-3">国王！</span>
        </Typed>
        <p>
          <Typed delay={1600}>“最懒惰、邪恶、粗鲁、愚笨的人，这个人</Typed>
          <Typed delay={1600 + 2200}>就是西拉拉国的国王了。“</Typed>
        </p>
      </>
    ),
    prompt:
      "1King Dressed in a regal robe with a crown on his head, sitting on a throne made of gold and jewels, having a scepter in hand as a symbol of his power and authority,best face,best eye,best mouth,best quality, 8k <lora:lzastory_6000:1> ",
  },
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [img, setImg] = useState<string | null>();
  const [print, setPrint] = useState<boolean>(false);

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
        setImg(res);
      })
      .catch((err) => {
        console.error("err", err);
        message.error("请求超时，即将重试");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      });
  }, [state, img]);

  if (!state || !state.photo || !state.value) {
    return null;
  }
  if (print) {
    return <Print src={img ?? ""} onDone={() => setPrint(false)} />;
  }

  const handlePrint = () => {
    setPrint(true);
  };

  if (img) {
    return (
      <div className="flex flex-row w-[100vw] h-[100vh] items-center justify-center fade-in">
        <div className="flex flex-col h-full pt-16">
          <img src={img} alt="" className="h-[368px]" />
          <button className="mt-16 text-3xl w-full" onClick={handlePrint}>
            打 印
          </button>
        </div>
        <div className="flex flex-col items-center h-full pt-16 pl-16">
          <div className="h-[368px] flex flex-col-reverse">
            <QRCode
              value={img}
              color="white"
              style={{
                backgroundColor: "black",
                padding: 0,
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <span className="mt-16 text-3xl py-[0.4em] px-[1.2em] border-[0.08em] border-transparent">
            拜拜
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center fade-in">
      <div
        className={`flex flex-col w-[60%] text-3xl ${styles.view}`}
        style={{
          lineHeight: 2,
        }}
      >
        {valueStore[state.value as keyof typeof valueStore].node}
        {state.value !== "驱逐" && (
          <div className="flex flex-col items-center">
            <Process className="mt-12" maxValue={95} />
            <span>请等待通行证生成</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
