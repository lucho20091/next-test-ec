import toast from "react-hot-toast";

const MAX_TOASTS = 4;

// Store active toast IDs
let activeToasts = [];

export const registerToast = (id) => {
  activeToasts.push(id);

  // If we exceed the limit, remove the oldest
  if (activeToasts.length > MAX_TOASTS) {
    const oldest = activeToasts.shift();
    toast.dismiss(oldest);
  }
};

// Optional cleanup when calling dismiss manually
export const removeToastById = (id) => {
  activeToasts = activeToasts.filter((t) => t !== id);
};
