import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  visible?: boolean;
}

export default function Button({
  children,
  onClick,
  className = '',
  disabled = false,
  visible = true,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn btn-black text-white max-w-[380px] text-2xl font-medium mx-auto w-full
        flex items-center justify-center
        ${visible ? 'visible' : 'invisible'}
        ${disabled ? ' cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
