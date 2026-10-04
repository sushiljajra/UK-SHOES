import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-medium tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center";

  const sizeStyles = {
    sm: "h-9 px-4 text-[11px]",
    md: "h-12 px-7 text-[12px]",
    lg: "h-14 px-9 text-[13px]",
  };

  const variantStyles = {
    primary:
      "bg-[#111111] text-[#ffffff] hover:bg-[#2a2a2a] active:bg-[#000000] border border-[#111111] shadow-sm",
    secondary:
      "bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#ffffff] active:bg-[#2a2a2a]",
    ghost:
      "bg-transparent text-[#111111] hover:text-[#5a5751] relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#111111] after:transition-all px-2",
    inverted:
      "bg-[#faf9f5]/90 backdrop-blur-sm text-[#111111] hover:bg-[#ffffff] active:bg-[#f0ede6] border border-[#e5e2e1] shadow-sm",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
