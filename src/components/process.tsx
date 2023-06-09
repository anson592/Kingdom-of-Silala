import React, { useState, useEffect } from "react";

export interface ProcessProps {
  defaultValue?: number;
  className?: string;
  maxValue?: number;
  speed?: number;
  onMax?: () => void;
}

export const Process: React.FC<ProcessProps> = ({
  defaultValue = 0,
  maxValue = 100,
  className = "",
  speed = 500,
  onMax,
}) => {
  const [v, setV] = useState(defaultValue);

  useEffect(() => {
    const id = setInterval(() => {
      setV((v) => {
        if (v >= maxValue) {
          clearInterval(id);
          onMax?.();
          return maxValue;
        }
        if (v >= maxValue - 10) {
          return v + 0.1;
        }
        return v + 1;
      });
    }, speed);
    return () => {
      clearInterval(id);
    };
  }, [speed]);

  return (
    <div className={`w-full h-[60px] border-white border-[3px] ${className}`}>
      <div
        className="h-full bg-white transition-all"
        style={{
          width: `${v}%`,
        }}
      ></div>
    </div>
  );
};
