import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { Process } from "../../components/process";
import { QRCode, message } from "antd";
import Print from "../print";

import { img2img } from "../../api/socket";

const valueStore = {
  驱逐: {
    node: (
      <>
        <p>恭喜你被西拉拉国驱逐！</p>
        <p>
          善良、正直、不和邪恶同流合污的人，
          就会被无情地赶出这个国家，因为人们都不欢迎这样的人。
        </p>
      </>
    ),
    prompt: null,
  },
  平民: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的平民，请等待通行证生成！</p>
        <p>
          “这个国家鼓励大家不要去工作，所以每个人都爱睡觉，只要你睡觉，就会有人奖励你一颗砖石。喜欢抽烟喝酒的人，也会得到奖赏。”
        </p>
      </>
    ),
    prompt: "",
  },
  警察: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的警察，请等待通行证生成！</p>
        <p>
          在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
        </p>
      </>
    ),
    prompt: "",
  },
  银行家: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的银行家，请等待通行证生成！</p>
        <p>
          在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
        </p>
      </>
    ),
    prompt: "",
  },
  法官: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的法官，请等待通行证生成！</p>
        <p>
          在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
        </p>
      </>
    ),
    prompt: "",
  },
  骑士: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的骑士，请等待通行证生成！</p>
        <p>
          在西拉拉国，“当官的人什么都不用做，只需要互相吹捧，他们的官就会越做越大。”
        </p>
      </>
    ),
    prompt: "",
  },
  将军: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的将军，请等待通行证生成！</p>
        <p>
          在西拉拉国，“最愚蠢、最不讲道理的人就能得到贵族的称号，最会享受和玩乐的人，就能得到伯爵
          的爵位。”
        </p>
      </>
    ),
    prompt: "",
  },
  伯爵: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的伯爵，请等待通行证生成！</p>
        <p>
          在西拉拉国，“最愚蠢、最不讲道理的人就能得到贵族的称号，最会享受和玩乐的人，就能得到伯爵
          的爵位。”
        </p>
      </>
    ),
    prompt: "",
  },
  国王: {
    node: (
      <>
        <p>恭喜你成为西拉拉国的国王，请等待通行证生成！</p>
        <p>
          在西拉拉国，“最懒惰、邪恶、粗鲁、愚笨的人，这个人就是西拉拉国的国王了。”
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

    img2img(
      state.photo,
      valueStore[state.value as keyof typeof valueStore].prompt!
    )
      .then((res) => {
        setImg(res);
      })
      .catch((err) => {
        message.error("请求超时，即将重试");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
        <Process className="mt-12" maxValue={95} />
      </div>
    </div>
  );
};

export default Result;
