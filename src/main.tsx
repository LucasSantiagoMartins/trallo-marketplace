import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/main.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: "30px",
          padding: "14px 24px",
          background: "#fff",
          fontSize: "12px",
          fontWeight: "600",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
        blank: {
          icon: <Info size={20} color="#3b82f6" />,
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
    <App />
  </Provider>,
);
