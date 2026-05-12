"use client";

import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";

type CopyButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  value: string;
};

const className =
  "absolute right-0 top-0 min-h-6 cursor-pointer whitespace-nowrap rounded-md bg-black px-3 text-xs font-medium text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus:ring-white/25";

export default function CopyButton({
  className: customClassName,
  type = "button",
  value,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const textToCopy = value.startsWith("/")
        ? `${window.location.origin}${value}`
        : value;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <span className="relative inline-block h-6 w-12 align-middle">
      <button
        type={type}
        {...props}
        onClick={handleCopy}
        className={`${className} ${customClassName ?? ""}`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </span>
  );
}
