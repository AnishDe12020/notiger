import { Field } from "formik";
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
}: IFormikInputGroup): JSX.Element => {
  return (
    <div className={cx("flex flex-col space-y-2", className)}>
      <label htmlFor={id} className={cx("text-gray-100", labelClassName)}>
        {label}
      </label>
      <Field
        as={as}
        type={type}
        id={id}
        name={name}
        className={cx(
          "rounded-lg border-2 bg-gray-900 text-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60",
          inputClassName
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormikInputGroup;
