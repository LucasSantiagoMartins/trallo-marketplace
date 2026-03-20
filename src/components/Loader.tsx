import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoaderAnimation: React.FC<LoaderProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "size-6 border-2",
    md: "size-8 border-4",
    lg: "size-12 border-4",
  };

  return (
    <div
      className={`flex h-screen flex-col items-center justify-center ${className}`}
    >
      <div
        className={`animate-spin ${sizeClasses[size]} border-primary border-t-transparent rounded-full mx-auto mb-4`}
      />
    </div>
  );
};

export default LoaderAnimation;
