import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Problem, Camera, Result, Print } from "./pages";
import "antd/dist/reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/result" element={<Result />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </Router>
  );
}

export default App;
