import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./tailwind.css";

import chxs from "./assets/ch-xs.ttf";

const chxsFont = new FontFace("ch-xs", `url(${chxs})`);

document.fonts.add(chxsFont);

chxsFont.load().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
});
