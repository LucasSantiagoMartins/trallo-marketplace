import { useContext } from "react";
import { ToastContext } from "@/context/ToastContext";

export function useAppToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useAppToast must be used inside ToastProvider");
  return ctx;
}
