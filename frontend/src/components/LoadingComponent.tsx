import React from "react";

interface LoadingComponentProps {
  size?: "small" | "medium" | "large";
  color?: string;
  text?: string;
  showText?: boolean;
  className?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  size = "medium",
  color = "black",
  text = "Loading...",
  showText = true,
  className = "",
}) => {
  const spinnerSizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const spinnerSize = spinnerSizes[size];
  const textSizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };
  const textSize = textSizes[size];

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`border-t-2 border-r-2 border-b-2 border-transparent border-${color} ${spinnerSize} rounded-full animate-spin`}
        style={{
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: color,
        }}
      ></div>
      {showText && <span className={`${textSize} font-medium`}>{text}</span>}
    </div>
  );
};

export default LoadingComponent;
