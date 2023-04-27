import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleStep0 = () => {
    setStep(1);
  };
  const handleStep1 = () => {
    setStep(2);
    navigate("/camera");
  };

  if (step === 0) {
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-evenly">
        <span className="text-6xl">欢迎来到西拉拉国!!!</span>
        <button className="text-4xl" onClick={handleStep0}>
          进 入
        </button>
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <span className="text-6xl w-[80%] mt-[4rem]">简介</span>
      <div
        className="w-[80%] mt-[2rem] text-xl"
        style={{
          lineHeight: 2,
        }}
      >
        <p>
          欢迎来到神奇的西拉拉国，一个远离尘世的国度，这里有着与众不同的传统和竞赛!在这个美丽的国家里，房子是由蜜汁饼干和巧克力砌成的，河流里流淌着牛奶，而天空中下着蜜糖雨。在这里，懒惰、邪恶、粗鲁和愚蠢被当做美德，而善良和正直却不受欢迎。
        </p>
        <p>
          每年，西拉拉国都会举行一场盛大的比赛，选拔出最具懒惰、邪恶、粗鲁和愚笨特质的人，他将成为这个国家的国王。这场比赛成为了国民们追求荣誉和权力的象征，而那些拒绝与恶劣行为为伍的善良人士则会被赶出国境。
        </p>
        <p>那么，你是否准备好踏上这场奇妙的冒险了呢?</p>
      </div>
      <button className="text-3xl mt-[2rem]" onClick={handleStep1}>
        进 入
      </button>
    </div>
  );
};

export default Home;
