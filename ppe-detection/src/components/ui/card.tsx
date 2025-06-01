import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white rounded-lg shadow">{children}</div>;
};

export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export default Card;