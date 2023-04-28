import { useEffect } from "react";

export const Print = ({ src, onDone }: { src?: string; onDone?: any }) => {
  useEffect(() => {
    document.body.setAttribute("style", "background:white");
    document.documentElement.setAttribute("style", "background:white");
    window.print();
    return () => {
      document.body.removeAttribute("style");
      document.documentElement.removeAttribute("style");
      onDone?.();
    };
  }, [src]);

  return <img className="h-[100vh]" src={src} />;
};

export default Print;
