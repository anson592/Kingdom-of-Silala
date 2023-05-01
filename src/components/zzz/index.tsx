import { useEffect, useState } from "react";
import "./index.scss";

const ZZZ = ({ ...rest }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setKey((k) => k + 1);
    }, 1500);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div key={key} {...rest}>
      <div className="ml-[2em] z2">z</div>
      <div className="ml-[1em] z1">z</div>
      <div className="ml-[0em] z0">z</div>
    </div>
  );
};

export default ZZZ;
