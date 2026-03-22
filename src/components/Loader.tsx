import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoaderAnimation: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "size-6 border-2",
    md: "size-8 border-4",
    lg: "size-12 border-4",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin ${sizeClasses[size]} border-[#6d3ff8] border-t-transparent rounded-full`}
      />
    </div>
  );
};

export default LoaderAnimation;
