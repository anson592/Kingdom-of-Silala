import "./App.css";

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

const BGM = ({ children }: { children: React.ReactNode }) => {
  const match = !!useMatch("/");

  useEffect(() => {
    const bgm = new Audio(match ? beforeSrc : afterSrc);
    bgm.loop = true;
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, [match]);

  return <div>{children}</div>;
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
