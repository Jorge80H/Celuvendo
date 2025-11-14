import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import helper for debugging (will be available as window.updateInfinixProduct)
import "./lib/update-infinix-helper";

createRoot(document.getElementById("root")!).render(<App />);
