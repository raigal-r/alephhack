import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  onClick,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-black text-white max-w-[380px] text-2xl font-medium mx-auto w-full flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
