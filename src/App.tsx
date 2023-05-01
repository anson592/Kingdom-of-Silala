import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Problem, Camera, Result, Print } from "./pages";
import "antd/dist/reset.css";
import { useEffect } from "react";
import bgmSrc from "@/assets/bgm.mp3";
import { TransitionGroup } from "react-transition-group";

function App() {
  useEffect(() => {
    const bgm = new Audio(bgmSrc);
    bgm.loop = true;
    // bgm.play();
    return () => {
      // bgm.pause();
    };
  }, []);

  return (
    <Router>
      <TransitionGroup>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/result" element={<Result />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </TransitionGroup>
    </Router>
  );
}

export default App;
