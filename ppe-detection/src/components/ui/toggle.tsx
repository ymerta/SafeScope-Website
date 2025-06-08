import React, { useState, useEffect } from "react";

interface ToggleProps {
  defaultPressed?: boolean;
  onToggle?: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ defaultPressed = false, onToggle }) => {
  const [isOn, setIsOn] = useState(defaultPressed);

  useEffect(() => {
    if (onToggle) onToggle(isOn);
  }, [isOn, onToggle]);

  const handleToggle = () => setIsOn(!isOn);

  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 rounded-full relative transition-colors ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};