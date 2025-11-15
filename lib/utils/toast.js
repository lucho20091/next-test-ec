import toast from "react-hot-toast";
import { registerToast, removeToastById } from "./toastManager";

export const showToast = (message, type = "default") => {
  const baseStyle = {
    background: "#333",
    color: "#fff",
  };

  let id;

  switch (type) {
    case "success":
      id = toast.success(message, { style: baseStyle });
      break;
    case "error":
      id = toast.error(message, { style: baseStyle });
      break;
    case "loading":
      id = toast.loading(message, { style: baseStyle });
      break;
    default:
      id = toast(message, { style: baseStyle, duration: 2000 });
  }

  registerToast(id);

  return id;
};
