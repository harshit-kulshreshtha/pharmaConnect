"use client";
import { useToast } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-300",
          icon: "✓",
          iconColor: "text-green-600",
          textColor: "text-green-800",
          titleColor: "text-green-900",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-300",
          icon: "✕",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          titleColor: "text-red-900",
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-300",
          icon: "!",
          iconColor: "text-amber-600",
          textColor: "text-amber-800",
          titleColor: "text-amber-900",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-300",
          icon: "i",
          iconColor: "text-blue-600",
          textColor: "text-blue-800",
          titleColor: "text-blue-900",
        };
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-md">
      {toasts.map((toast) => {
        const styles = getStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`${styles.bg} border ${styles.border} rounded-lg p-4 shadow-lg flex items-start gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300`}
          >
            <div
              className={`${styles.iconColor} text-lg font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white`}
            >
              {styles.icon}
            </div>
            <div className="flex-1">
              <p className={`${styles.textColor} text-sm`}>{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className={`${styles.textColor} text-lg flex-shrink-0 hover:opacity-70 transition`}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
