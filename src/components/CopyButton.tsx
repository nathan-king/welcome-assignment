import type { ButtonHTMLAttributes } from "react";

type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const className =
  "min-h-6 rounded-md bg-black px-3 text-xs font-medium text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus:ring-white/25";

export default function CopyButton({
  className: customClassName,
  type = "button",
  ...props
}: CopyButtonProps) {
  return (
    <button
      type={type}
      className={`${className} ${customClassName ?? ""}`}
      {...props}
    >
      Copy
    </button>
  );
}
