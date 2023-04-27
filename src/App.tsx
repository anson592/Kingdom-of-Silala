import "./App.css";
import "tdesign-react/es/style/index.css";
import "tdesign-react/dist/reset.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Problem, Camera } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
}

export default App;
