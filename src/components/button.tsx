import React from "react";

import pressSrc from "@/assets/click.wav";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  const handleClick = (e: any) => {
    const audio = new Audio(pressSrc);
    audio.play();
    setTimeout(() => {
      onClick && onClick(e);
    }, 300);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
