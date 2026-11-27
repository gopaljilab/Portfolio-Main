import { createRoot } from "react-dom/client";
import App from "./App";
import "lenis/dist/lenis.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./fonts.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
