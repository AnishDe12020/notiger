import { forwardRef, ReactNode } from "react";
import { Spinner } from "./Icons";
import cx from "classnames";

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
        className={cx(
          "flex items-center justify-center space-x-3 rounded-lg px-3 py-1",
          "text-lg font-medium text-gray-900 transition duration-200 hover:opacity-60",
          danger ? "bg-red-500" : "bg-gray-100",
          loading && "cursor-not-allowed opacity-60",
          className
        )}
        type={type}
        ref={ref}
        disabled={loading}
      >
        {loading ? (
          <Spinner className="h-6 w-6 py-0.5 text-gray-700" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
