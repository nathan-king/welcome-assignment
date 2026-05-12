import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "small" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: ButtonSize;
};

const baseClassName =
  "rounded-md bg-black font-medium text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus:ring-white/25";

const sizeClassNames: Record<ButtonSize, string> = {
  small: "min-h-6 px-3 text-xs",
  large: "min-h-11 px-5 text-sm",
};

export default function Button({
  children,
  className,
  size = "large",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClassName} ${sizeClassNames[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
