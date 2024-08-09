"use client";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export type ButtonTypes = "primary" | "secondary" | "ghost" | "icon";
type Props = {
  type?: ButtonTypes;
  children: string | ReactNode;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
  btnType?: "button" | "submit" | "reset";
  disabled?: boolean;
};
export default function Button({
  type = "primary",
  children,
  onClick,
  className,
  tooltip,
  disabled,
  btnType = "button",
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  if (type === "icon") {
    return (
      <button
        className={cn(
          "px-3 py-2 rounded-md bg-transparent hover:bg-primary/5 relative",
          className
        )}
        type={btnType}
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
        {tooltip && showTooltip && (
          <span className="absolute -bottom-8 text-xs left-1/2 -translate-x-1/2 bg-primary/70 text-secondary text-nowrap px-3 py-1 rounded-md">
            {tooltip}
          </span>
        )}
      </button>
    );
  }
  if (type === "ghost") {
    return (
      <button
        className={cn(
          "px-3 py-2 rounded-md font-medium text-sm text-primary text-nowrap hover:text-main hover:underline underline-offset-4 transition-all duration-100 ease-linear w-fit",
          className
        )}
        type={btnType}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  if (type === "secondary") {
    return (
      <button
        className={cn(
          "px-8 py-2 rounded-md text-main_comp border-2 border-main bg-white font-medium text-sm text-nowrap hover:bg-main hover:text-white transition-all duration-100 ease-linear w-fit",
          className
        )}
        type={btnType}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={cn(
        "px-8 py-2 rounded-sm text-black bg-main font-medium text-sm text-nowrap hover:bg-main_comp hover:text-white transition-all duration-100 ease-linear w-fit",
        className
      )}
      type={btnType}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
