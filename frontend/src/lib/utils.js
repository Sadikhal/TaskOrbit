import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// formating date and time together
export const formatDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const options = { weekday: "short", year: "numeric", month: "short", day: "2-digit" };
  const datePart = d.toLocaleDateString(undefined, options);
  const timePart = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${datePart} • ${timePart}`;
};


// columns for tasks
  export const columns = [
    { header: "Task Title", className: "px-2" },
    { header: "Description", className: "px-2" },
    { header: "Status", className: "px-2" },
    { header: "Created At", className: "px-2" },
    { header: "Actions", className: "px-2" },
  ];
