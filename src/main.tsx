import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MotionConfig transition={{ ease: "anticipate", duration: 0.7 }}>
      <App />
    </MotionConfig>
  </BrowserRouter>
);
