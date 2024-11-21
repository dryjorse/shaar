import clsx from "clsx";
import { forwardRef, useState } from "react";
import passwordHiddenIcon from "../../../assets/images/icons/password-hidden.svg";
import { FieldError } from "react-hook-form";

interface Props {
  icon: string;
  type?: string;
  placeholder?: string;
  className?: string;
  isPassword?: boolean;
  error?: FieldError;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      type = "text",
      placeholder = "",
      className = "",
      inputClassName = "",
      isPassword = false,
      error,
      ...register
    },
    ref
  ) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(false);

    return (
      <div
        className={clsx(
          "relative rounded-[40px] py-[12px] px-[18px] flex gap-[50px] items-center bg-green-white shadow-[1px_1px_7px_black]",
          className
        )}
      >
        <img
          src={icon}
          alt="input"
          className="w-[75px] h-[75px]"
        />
        <input
          ref={ref}
          placeholder={placeholder}
          className={clsx("text-[24px] text-white", inputClassName)}
          type={isPassword ? (isPasswordHidden ? "text" : "password") : type}
          {...register}
        />
        {isPassword && (
          <button
            className="absolute right-[37px]"
            onClick={() => setIsPasswordHidden((prev) => !prev)}
          >
            <img src={passwordHiddenIcon} alt="" />
          </button>
        )}
        {error && (
          <span className="absolute text-red bottom-[-30px]">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
