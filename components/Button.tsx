import { forwardRef, ReactNode } from "react";
import { Spinner } from "./Icons";

interface IButtonProps {
  className?: string;
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { className, children, danger, onClick, type, loading }: IButtonProps,
    ref
  ): JSX.Element => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center space-x-3 rounded-lg ${
          danger ? "bg-red-500" : "bg-gray-100"
        } px-3 py-1 text-lg font-medium text-gray-900 transition duration-200 hover:opacity-60 ${className}`}
        type={type}
        ref={ref}
      >
        {loading ? <Spinner className="h-7 w-7 text-gray-700" /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
