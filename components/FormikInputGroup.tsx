import { ErrorMessage, Field } from "formik";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import cx from "classnames";

interface IFormikInputGroup {
  type?: HTMLInputTypeAttribute;
  name: string;
  id: string;
  as?: string | ReactNode;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
}

const FormikInputGroup = ({
  type,
  name,
  id,
  as,
  className,
  labelClassName,
  inputClassName,
  placeholder,
  label,
  required,
}: IFormikInputGroup): JSX.Element => {
  return (
    <div className={cx("flex flex-col space-y-2", className)}>
      <label htmlFor={id} className={cx("text-gray-100", labelClassName)}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <Field
        as={as}
        type={type}
        id={id}
        name={name}
        className={cx(
          "rounded-lg border-2 bg-secondary text-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60",
          inputClassName
        )}
        placeholder={placeholder}
        required={required}
      />
      <ErrorMessage
        name={name}
        render={msg => (
          <div className="text-mt-2 rounded-lg bg-red-500 px-3 py-1">{msg}</div>
        )}
      />
    </div>
  );
};

export default FormikInputGroup;
