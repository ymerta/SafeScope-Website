import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "default" }) => {
  const base = "px-4 py-2 rounded font-medium";
  const style =
    variant === "default"
      ? "bg-black text-white hover:bg-gray-800"
      : "border border-black text-black bg-white hover:bg-gray-100";

  return (
    <button onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
};