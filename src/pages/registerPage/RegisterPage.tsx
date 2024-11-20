import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/background.jpg";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import cameraIcon from "../../assets/images/icons/camera.svg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile.svg";
import passwordIcon from "../../assets/images/icons/password.svg";
import { useForm } from "react-hook-form";
import { IRegisterForm } from "../../types/client.types";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [ava, setAva] = useState<File | null>(null);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({ mode: "onTouched" });

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className=" py-[37px] h-screen text-white"
    >
      <div className="container max-w-[1320px] flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <img src={arrowIcon} alt="arrow" />
        </button>
        <h1 className="text-[64px] font-bold uppercase">Sign Up</h1>
        <div></div>
      </div>
      <div className="mt-90 rounded-[100px_100px_0_0] pt-[62px] bg-gray h-full">
        <div className="container">
          <div className="flex justify-between text-center">
            <div>
              <label
                htmlFor="ava"
                className="rounded-circle overflow-hidden block mb-80 w-[350px] h-[350px]"
              >
                {ava ? (
                  <img
                    src={URL.createObjectURL(ava)}
                    alt="ava"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={cameraIcon} alt="camera" />
                )}
                <input
                  id="ava"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={({ target: { files } }) => setAva(files![0])}
                />
              </label>
              <span className="text-[#AFAFAF] text-[32px]">
                Add your profile photo
              </span>
            </div>
            <div className="flex-[0_1_550px]">
              <Input
                icon={profileIcon}
                type="email"
                placeholder="youremail@gmail.com"
                error={errors.email}
                {...register("email", {
                  required: "Поле не может быть пустым",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Введён некорректный email",
                  },
                })}
              />
              <Input
                icon={profileIcon}
                placeholder="Fullname"
                className="my-[48px]"
                error={errors.fullname}
                {...register("fullname", {
                  required: "Поле не может быть пустым",
                  minLength: { value: 2, message: "Минимум две буквы" },
                })}
              />
              <Input
                isPassword
                icon={passwordIcon}
                placeholder="your password"
                error={errors.password}
                {...register("password", {
                  required: "Поле не может быть пустым",
                  minLength: { value: 5, message: "Минимум пять символов" },
                })}
              />
              <button disabled={!isValid} className="btn mt-[48px] rounded-[43px] py-[8px] px-80 font-bold">
                Sign Up
              </button>
            </div>
          </div>
          <div className="mt-[96px]">
            <span className="text-[27px] text-green-white">
              Already have an account?{" "}
              <Link to="/login" className="font-bold">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
