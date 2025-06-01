import React, { useState } from "react";

export const Toggle: React.FC<{ defaultPressed?: boolean }> = ({ defaultPressed = false }) => {
  const [isOn, setIsOn] = useState(defaultPressed);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
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