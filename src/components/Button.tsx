import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const baseClassName =
  "min-h-11 cursor-pointer rounded-md bg-black px-5 text-sm font-medium text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus:ring-white/25";

export default function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClassName} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
