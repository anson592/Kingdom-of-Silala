import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import pressSrc from "@/assets/press.mp3";

export interface TypedProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  changeSize?: (size: number) => number;
  onEnd?: () => void;
  endDelay?: number;
  max?: number;
  delay?: number;
  speed?: number;
}

const Typed: React.FC<TypedProps> = ({
  children,
  className = "",
  changeSize = (s) => s,
  onEnd,
  endDelay = 1000,
  size,
  max,
  delay,
  speed = 50,
  ...rest
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const [start, setStart] = useState(false);

  const _size = changeSize(
    size || (typeof children === "string" ? children.length : 0)
  );

  const oneStep = 1.1;

  useEffect(() => {
    if (!start) {
      return;
    }
    const bgm = new Audio(pressSrc);
    bgm.loop = true;
    bgm.play();
    const id = setTimeout(() => {
      bgm.pause();
    }, speed * _size);
    return () => {
      clearTimeout(id);
      bgm.pause();
    };
  }, [start, _size, speed]);

  useEffect(() => {
    if (!start || !el.current) {
      return;
    }

    let now = 0;
    let id = setInterval(() => {
      if (now >= _size && el.current) {
        clearInterval(id);
        setStart(false);
        if (max) {
          el.current.style.width = `${max}em`;
        }
        setTimeout(() => {
          onEnd?.();
        }, endDelay);
        return;
      }
      now++;
      el.current!.style.width = `${now * oneStep}em`;
    }, speed);
    return () => {
      clearInterval(id);
    };
  }, [el, start, oneStep, _size, max, onEnd, endDelay, speed]);

  useEffect(() => {
    const id = setTimeout(() => {
      setStart(true);
    }, delay);
    return () => clearTimeout(id);
  }, [delay]);

  return (
    <span
      className={`${
        start ? "typed-cursor" : "typed-cursor__unactive"
      } overflow-hidden flex flex-row items-center ${className}`}
      {...rest}
    >
      <span
        className="inline-block overflow-hidden whitespace-nowrap"
        style={{
          width: 0,
        }}
        ref={el}
      >
        {children}
      </span>
    </span>
  );
};

export default Typed;
