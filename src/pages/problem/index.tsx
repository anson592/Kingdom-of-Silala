import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import wall from "@/assets/images/wall.png";

function buttonPressed(b: any) {
  if (typeof b == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

const problems = [
  {
    id: 1,
    question: "你希望出现的画面是：",
    options: [
      {
        text: "你在帮助别人",
        value: "驱逐",
      },
      {
        text: "你在骑马吃烤鸭",
        value: "平民",
      },
      {
        text: "你在巧克力赌场抽烟赌博",
        value: 2,
      },
    ],
  },
  {
    id: 2,
    question: "在赌桌上，你很快就把筹码输光，这时你选择：",
    options: [
      {
        text: "去银行抢劫",
        value: "警察",
      },
      {
        text: "到树林里捡金币",
        value: "银行家",
      },
      {
        text: "装睡骗取钻石",
        value: 3,
      },
      {
        text: "偷荷官的筹码",
        value: "法官",
      },
    ],
  },
  {
    id: 3,
    question: "再次回到赌桌，你遇到了朋友，你选择：",
    options: [
      {
        text: "告诉他你输光了，准备去装睡",
        value: "骑士",
      },
      {
        text: "赞美他，邀请他与你一同赌博",
        value: 4,
      },
    ],
  },
  {
    id: 4,
    question: "此时你们输光了所有的钱，你选择：",
    options: [
      {
        text: "卖掉你的房子",
        value: "将军",
      },
      {
        text: "卖掉朋友的房子",
        value: 5,
      },
    ],
  },
  {
    id: 5,
    question: "已经输光了所有财产并欠下大额赌债，你选择：",
    options: [
      {
        text: "努力睡觉",
        value: "伯爵",
      },
      {
        text: "吃掉赌场，把朋友暴打一顿",
        value: "国王",
      },
    ],
  },
];

export interface ProblemOption {
  text: string;
  value: string | number;
}

const Problem = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  const currentProblem = problems.find(
    (item) => item.id === currentProblemIndex
  )!;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const gamepadID = useRef<number | null>(null);

  const wallEle = (
    <img
      src={wall}
      className="absolute bottom-0 left-0 w-[100vw] z-10 pointer-events-none"
    />
  );

  useEffect(() => {
    if (!state || !state.photo) {
      navigate("/");
    }
  }, [state]);

  useEffect(() => {
    const handleGamepad = () => {
      const gp = navigator.getGamepads()[gamepadID.current || 0];
      if (!gp) {
        console.warn("控制器未连接");
        return;
      }
      const [up, down] = gp.axes;
      console.log("up", up, down);
      if (up === -1) {
        setSelectedOptionIndex((prevIndex) =>
          prevIndex === 0 ? currentProblem.options.length - 1 : prevIndex - 1
        );
      } else if (down === 1) {
        setSelectedOptionIndex((prevIndex) =>
          prevIndex === currentProblem.options.length - 1 ? 0 : prevIndex + 1
        );
      }
      const confirmButton = gp.buttons[0];
      if (buttonPressed(confirmButton)) {
        const selectedOption = currentProblem.options[selectedOptionIndex];
      }
    };
    // const interval = setInterval(handleGamepad, 100);
    // return () => clearInterval(interval);
  }, [
    currentProblem,
    currentProblemIndex,
    problems.length,
    selectedOptionIndex,
  ]);

  useEffect(() => {
    const handleConnected = (event: GamepadEvent) => {
      console.log("Gamepad connected");
      gamepadID.current = event.gamepad.index;
      const gp = navigator.getGamepads()[event.gamepad.index];
      if (!gp) {
        console.warn("控制器未连接");
        return;
      }
      console.log(
        "控制器已连接于 %d 位：%s. %d 个按钮，%d 个坐标方向。",
        gp.index,
        gp.id,
        gp.buttons.length,
        gp.axes.length
      );
    };
    window.addEventListener("gamepadconnected", handleConnected);
    window.addEventListener("gamepaddisconnected", (event) => {
      console.log("Gamepad disconnected");
    });
    return () => {
      window.removeEventListener("gamepadconnected", handleConnected);
    };
  }, []);

  const handleClick = (option: ProblemOption) => {
    if (typeof option.value === "number") {
      setCurrentProblemIndex(option.value);
      return;
    }
    navigate("/result", {
      state: {
        photo: state.photo,
        value: option.value,
      },
    });
  };

  useEffect(() => {
    // 监控ws与上下方向键，以及Enter键/Space键，用来设置selectedOptionIndex以及跳转
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      if (selectedOptionIndex === -1) {
        setSelectedOptionIndex(0);
        return;
      }

      if (currentProblem.options.length < 4) {
        if (key === "ArrowUp" || key === "w" || key === "W") {
          setSelectedOptionIndex((prevIndex) =>
            prevIndex === 0 ? currentProblem.options.length - 1 : prevIndex - 1
          );
        } else if (key === "ArrowDown" || key === "s" || key === "S") {
          setSelectedOptionIndex((prevIndex) =>
            prevIndex === currentProblem.options.length - 1 ? 0 : prevIndex + 1
          );
        }
      } else {
        if (key === "ArrowLeft" || key === "a" || key === "A") {
          setSelectedOptionIndex((prevIndex) =>
            prevIndex === 0 ? currentProblem.options.length - 1 : prevIndex - 1
          );
        } else if (key === "ArrowRight" || key === "d" || key === "D") {
          setSelectedOptionIndex((prevIndex) =>
            prevIndex === currentProblem.options.length - 1 ? 0 : prevIndex + 1
          );
        } else if (key === "ArrowUp" || key === "w" || key === "W") {
          setSelectedOptionIndex((prevIndex) => {
            const newIndex = prevIndex - 2;
            if (newIndex < 0) {
              return newIndex + currentProblem.options.length;
            }
            return newIndex;
          });
        } else if (key === "ArrowDown" || key === "s" || key === "S") {
          setSelectedOptionIndex((prevIndex) => {
            const newIndex = prevIndex + 2;
            return newIndex % currentProblem.options.length;
          });
        }
      }

      if (key === "Enter" || key === " ") {
        setSelectedOptionIndex((prev) => {
          const selectedOption = currentProblem.options[prev];
          handleClick(selectedOption);
          return -1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentProblem, selectedOptionIndex]);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      <div
        className="flex flex-col pl-[8rem] pt-[7rem] w-full items-center fade-in"
        key={currentProblemIndex}
      >
        <div className="text-3xl w-full mb-[3rem]">
          {currentProblemIndex}. {currentProblem.question}
        </div>
        {currentProblem.options.length < 4 && (
          <div className={"flex flex-col w-[80%]"}>
            {currentProblem.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} w-full ${
                  selectedOptionIndex === index ? styles["option-active"] : ""
                }`}
                onClick={() => handleClick(option)}
              >
                {`${String.fromCharCode(65 + index)}. ${option.text}`}
              </div>
            ))}
          </div>
        )}
        {currentProblem.options.length >= 4 && (
          <div className={"flex flex-row flex-wrap w-[100%]"}>
            {currentProblem.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} w-[40%] ${
                  selectedOptionIndex === index ? styles["option-active"] : ""
                }`}
                onClick={() => handleClick(option)}
              >
                {`${String.fromCharCode(65 + index)}. ${option.text}`}
              </div>
            ))}
          </div>
        )}
      </div>
      {wallEle}
    </div>
  );
};

export default Problem;
