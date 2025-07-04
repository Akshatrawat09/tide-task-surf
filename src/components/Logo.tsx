
import React from 'react';

const Logo = ({ size = "medium" }: { size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12", 
    large: "w-20 h-20"
  };

  return (
    <div className={`${sizeClasses[size]} animate-float`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Wave body */}
        <path
          d="M20 60 Q30 40, 50 50 Q70 60, 80 40"
          fill="hsl(var(--primary))"
          className="drop-shadow-lg"
        />
        {/* Wave face */}
        <circle cx="50" cy="48" r="3" fill="white" />
        <circle cx="45" cy="48" r="3" fill="white" />
        <circle cx="47.5" cy="48.5" r="1" fill="hsl(var(--primary))" />
        <circle cx="52.5" cy="48.5" r="1" fill="hsl(var(--primary))" />
        {/* Smile */}
        <path
          d="M45 52 Q50 57, 55 52"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Pencil surfboard */}
        <rect
          x="48"
          y="35"
          width="4"
          height="12"
          fill="hsl(var(--accent))"
          rx="2"
          transform="rotate(-15 50 41)"
        />
        <rect
          x="49"
          y="30"
          width="2"
          height="5"
          fill="#FFD700"
          rx="1"
          transform="rotate(-15 50 32.5)"
        />
      </svg>
    </div>
  );
};

export default Logo;
