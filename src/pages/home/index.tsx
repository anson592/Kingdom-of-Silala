import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import wall from "@/assets/images/wall.png";
import duckLeft from "@/assets/images/duck-left.png";
import duckTop from "@/assets/images/duck-top.png";
import tree from "@/assets/images/tree.png";
import coin from "@/assets/images/coin.png";
import diamond from "@/assets/images/diamond.png";
import drinkGreen from "@/assets/images/drink-green.png";
import drinkBlue from "@/assets/images/drink-blue.png";
import drinkYellow from "@/assets/images/drink-yellow.png";
import pbSrc from "@/assets/images/pb.png";
import beforeSrc from "@/assets/before.aac";

import king from "@/assets/images/king.png";

import "./index.scss";
import { Typed, ZZZ, Button } from "@/components";

const getDuration = () => Math.max(1, Math.random() * 3);

const Home = () => {
  const [step, setStep] = useState(-1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep((s) => {
      return s + 1;
    });
  };

  const wallEle = (
    <img
      src={wall}
      className="absolute bottom-0 left-0 w-[100vw] z-10 pointer-events-none"
    />
  );

  useEffect(() => {
    if (step === -1) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Enter" || key === " ") {
        if (step > 6) {
          navigate("/camera");
          return;
        }
        nextStep();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setStep, step]);

  useEffect(() => {
    const bgm = new Audio(beforeSrc);
    bgm.loop = true;
    const hidden = () => {
      bgm.play();
    };

    document.addEventListener("click", hidden);
    document.addEventListener("touchstart", hidden);
    document.addEventListener("keydown", hidden);
    return () => {
      bgm.pause();
      document.removeEventListener("click", hidden);
      document.removeEventListener("touchstart", hidden);
      document.removeEventListener("keydown", hidden);
    };
  }, []);

  useEffect(() => {
    if (step !== -1) {
      return;
    }
    const hidden = () => {
      setStep(0);
    };

    document.addEventListener("click", hidden);
    document.addEventListener("touchstart", hidden);
    document.addEventListener("keydown", hidden);
    return () => {
      document.removeEventListener("click", hidden);
      document.removeEventListener("touchstart", hidden);
      document.removeEventListener("keydown", hidden);
    };
  }, [step]);

  if (step === -1) {
    return (
      <>
        <img
          src={pbSrc}
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] object-cover z-50 cursor-pointer`}
        />
      </>
    );
  }

  if (step === 0) {
    return (
      <div
        className="w-[100vw] fade-in h-[100vh] flex flex-col items-center justify-evenly relative"
        key={step}
      >
        <Typed className="text-6xl" size={9} delay={800} max={10}>
          欢迎来到西拉拉国!!!
        </Typed>
        <Button className="text-4xl" onClick={() => setStep(1)}>
          进 入
        </Button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center relative">
        <Typed className="text-3xl lh-2" changeSize={(i) => i + 1}>
          这是一个远离尘世的国度，有着与众不同的传统和竞赛
        </Typed>
        <Typed className="text-3xl lh-2" delay={3800} onEnd={nextStep}>
          房子是由蜜汁饼干和巧克力砌成的
        </Typed>
        {wallEle}
      </div>
    );
  }

  if (step === 2) {
    return (
      <div
        className="w-[100vw] h-[100vh] flex flex-col items-center justify-center text-3xl relative overflow-hidden"
        style={{
          lineHeight: 2,
        }}
        key={step}
      >
        <Typed>天上飞的都是烤熟的鸭子和各种美味的飞鸟</Typed>
        <Typed delay={3000} onEnd={nextStep}>
          只要你招招手，它们就会飞进你的嘴巴
        </Typed>
        {wallEle}
        <img src={duckLeft} className="absolute w-[25vw] z-20 duck-left" />
        <img src={duckTop} className="absolute w-[25vw] z-20 duck-top" />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div
        className="w-[100vw] h-[100vh] flex flex-col items-center text-3xl relative justify-center overflow-hidden"
        style={{
          lineHeight: 2,
        }}
        key={step}
      >
        <div className="flex flex-col items-center absolute left-[6rem]">
          <Typed delay={800}>树上长满了金币，</Typed>
          <Typed delay={800 + 1200} onEnd={nextStep}>
            金子和树叶一样普通
          </Typed>
        </div>
        <img
          className="h-[100vh] right-0 top-0 absolute z-20 fade-in"
          src={tree}
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[13.5vh] absolute right-[77.5vh] top-[65.5vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[13.5vh] absolute right-[46.4vh] top-[58.9vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[13.5vh] absolute right-[35.7vh] top-[35.7vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[13.5vh] absolute right-[22.2vh] top-[24.3vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[13.5vh] absolute -right-[0.8vh] top-[42.3vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[16vh] absolute right-[4.7vh] top-[-3.2vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={coin}
          className="coin w-[20vh] absolute right-[14.9vh] top-[47.3vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        {wallEle}
      </div>
    );
  }

  if (step === 4) {
    return (
      <div
        className="w-[100vw] h-[100vh] flex flex-col items-center text-3xl relative justify-center overflow-hidden"
        style={{
          lineHeight: 2,
        }}
        key={step}
      >
        <div className="flex flex-col items-center absolute left-[6rem]">
          <Typed delay={800}>只要你睡一觉，</Typed>
          <Typed delay={800 + 1200} onEnd={nextStep}>
            就会奖励一颗钻石
          </Typed>
        </div>
        <ZZZ className="absolute text-5xl bottom-[14vw] right-[57vw]" />
        <img
          src={diamond}
          className="coin w-[13.5vh] absolute right-[50.4vh] top-[45.4vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={diamond}
          className="coin w-[14.8vh] absolute right-[37vh] top-[10vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={diamond}
          className="coin w-[34.4vh] absolute right-[14.8vh] top-[25.8vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        {wallEle}
      </div>
    );
  }

  if (step === 5) {
    return (
      <div
        className="w-[100vw] h-[100vh] flex flex-col items-center text-3xl relative justify-center overflow-hidden"
        style={{
          lineHeight: 2,
        }}
        key={step}
      >
        <div className="flex flex-col items-center absolute left-[6rem] top-[40%]">
          <Typed delay={800} onEnd={nextStep}>
            喜欢喝酒的人，会获得奖赏
          </Typed>
        </div>
        {/* <img src={drinkP} className="h-[100vh] z-20 absolute right-0 top-0" /> */}
        <img
          src={drinkGreen}
          className="drink w-[50vh] absolute right-[57.5vh] top-[45.7vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={drinkGreen}
          className="drink w-[70vh] absolute -right-[18.3vh] -top-[21vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={drinkBlue}
          className="drink w-[45vh] absolute right-[95vh] top-[1.5vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={drinkBlue}
          className="drink w-[44.5vh] absolute -right-[11.9vh] top-[35.2vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={drinkYellow}
          className="drink w-[41vh] absolute right-[77.2vh] -top-[6vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        <img
          src={drinkYellow}
          className="big-drink h-[70vh] absolute right-[6.9vh] top-[18vh] z-50"
          style={
            {
              "--duration": `${getDuration()}s`,
            } as any
          }
        />
        {wallEle}
      </div>
    );
  }

  if (step === 6) {
    return (
      <div
        className="w-[100vw] fade-in h-[100vh] flex flex-col items-center justify-center text-2xl overflow-hidden relative"
        style={{
          lineHeight: 2,
        }}
      >
        <div className="-mt-[7rem]">
          <Typed speed={100}>
            在这里，懒惰、邪恶、粗鲁和愚蠢被当做美德，而善良和正直却不受欢迎。
          </Typed>
          <Typed speed={100} delay={3333}>
            每年，西拉拉国都会举行一场盛大的比赛，选拔出最具懒惰、邪恶、粗鲁和
          </Typed>
          <Typed speed={100} delay={3333 + 3333}>
            愚笨特质的人，他将成为这个国家的国王，而那些拒绝与恶劣行为为伍的善
          </Typed>
          <Typed speed={100} delay={3333 + 3333 + 3333} onEnd={nextStep}>
            良人士则会被赶出国境。
          </Typed>
        </div>
        <img
          src={king}
          className="king absolute z-20 h-[50vh] bottom-0 right-[13vh]"
        />
        {wallEle}
      </div>
    );
  }

  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col items-center justify-center fade-in"
      key={step}
    >
      <Typed
        className="mt-[2rem] text-3xl"
        style={{
          lineHeight: 2,
        }}
      >
        那么，你准备好踏上这场奇妙的冒险了吗?
      </Typed>
      <Button
        className="text-3xl mt-[6rem]"
        onClick={() => {
          navigate("/camera");
        }}
      >
        进 入
      </Button>
    </div>
  );
};

export default Home;
