import { iniciarJogo } from "./pages/home.js";
import "../../public/css/styles.css";

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    iniciarJogo();
  });
}
