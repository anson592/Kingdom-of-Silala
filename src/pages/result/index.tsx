import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";

const valueStore = {
  驱逐: (
    <>
      <p>恭喜你被西拉拉国驱逐！</p>
      <p>
        善良、正直、不和邪恶同流合污的人，
        就会被无情地赶出这个国家，因为人们都不欢迎这样的人。
      </p>
    </>
  ),
  平民: (
    <>
      <p>恭喜你成为西拉拉国的平民，请等待通行证生成！</p>
      <p>
        “这个国家鼓励大家不要去工作，所以每个人都爱睡觉，只要你睡觉，就会有人奖励你一颗砖石。喜欢抽烟喝酒的人，也会得到奖赏。”
      </p>
    </>
  ),
  警察: (
    <>
      <p>恭喜你成为西拉拉国的警察，请等待通行证生成！</p>
      <p>
        在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
      </p>
    </>
  ),
  银行家: (
    <>
      <p>恭喜你成为西拉拉国的银行家，请等待通行证生成！</p>
      <p>
        在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
      </p>
    </>
  ),
  法官: (
    <>
      <p>恭喜你成为西拉拉国的法官，请等待通行证生成！</p>
      <p>
        在西拉拉国，“爱赌博、爱说谎的人就更得意了，他们通常都是法官、警察和银行家。”
      </p>
    </>
  ),
  骑士: (
    <>
      <p>恭喜你成为西拉拉国的骑士，请等待通行证生成！</p>
      <p>
        在西拉拉国，“当官的人什么都不用做，只需要互相吹捧，他们的官就会越做越大。”
      </p>
    </>
  ),
  将军: (
    <>
      <p>恭喜你成为西拉拉国的将军，请等待通行证生成！</p>
      <p>
        在西拉拉国，“最愚蠢、最不讲道理的人就能得到贵族的称号，最会享受和玩乐的人，就能得到伯爵
        的爵位。”
      </p>
    </>
  ),
  伯爵: (
    <>
      <p>恭喜你成为西拉拉国的伯爵，请等待通行证生成！</p>
      <p>
        在西拉拉国，“最愚蠢、最不讲道理的人就能得到贵族的称号，最会享受和玩乐的人，就能得到伯爵
        的爵位。”
      </p>
    </>
  ),
  国王: (
    <>
      <p>恭喜你成为西拉拉国的国王，请等待通行证生成！</p>
      <p>
        在西拉拉国，“最懒惰、邪恶、粗鲁、愚笨的人，这个人就是西拉拉国的国王了。”
      </p>
    </>
  ),
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state || !state.photo || !state.value) {
      navigate("/");
    }
  }, [state]);

  if (!state || !state.photo || !state.value) {
    return null;
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center">
      <div
        className={`flex flex-col w-[60%] text-3xl ${styles.view}`}
        style={{
          lineHeight: 2,
        }}
      >
        {valueStore[state.value as keyof typeof valueStore]}
      </div>
    </div>
  );
};

export default Result;
