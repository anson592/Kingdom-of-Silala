import "./App.css";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import { Home, Problem, Camera, Result, Print } from "./pages";
import "antd/dist/reset.css";
import { useEffect } from "react";
import beforeSrc from "@/assets/before.aac";
import afterSrc from "@/assets/after.aac";
import pbSrc from "@/assets/images/pb.png";

const BGM = ({ children }: { children: React.ReactNode }) => {
  const match = !!useMatch("/");
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (match) {
      return;
    }
    const bgm = new Audio(afterSrc);
    bgm.loop = true;
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, [match]);

  useEffect(() => {
    if (!match) {
      return;
    }

    const bgm = new Audio(beforeSrc);
    bgm.loop = true;
    const hidden = () => {
      setShow(false);
      bgm.play();
    };

    document.addEventListener("mouseover", hidden);
    return () => {
      bgm.pause();
      document.removeEventListener("mouseover", hidden);
    };
  }, [show, match]);

  return (
    <div>
      {match && show && (
        <img
          src={pbSrc}
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] object-cover z-50 cursor-pointer`}
        />
      )}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <BGM>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/result" element={<Result />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </BGM>
    </Router>
  );
}

export default App;
