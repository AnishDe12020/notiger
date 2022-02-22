import { ReactNode } from "react";

interface IButtonProps {
  className?: string;
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

const Button = ({
  className,
  children,
  danger,
  onClick,
}: IButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-3 rounded-lg ${
        danger ? "bg-red-500" : "bg-gray-100"
      } px-3 py-1 text-lg font-medium text-gray-900 transition duration-200 hover:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
