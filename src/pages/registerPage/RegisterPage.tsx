import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/background.jpg";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import cameraIcon from "../../assets/images/icons/camera.svg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile.svg";
import emailIcon from "../../assets/images/icons/email.svg";
import passwordIcon from "../../assets/images/icons/password.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "../../types/client.types";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom, notificationAtom } from "../../store/store";
import { useTranslation } from "react-i18next";
import avaDefaultImage from "../../assets/images/ava-default.png";
import { saveTokens, urlToFile } from "../../constants/helpers";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({ mode: "onTouched" });
  const { t } = useTranslation();
  const [_, setNotification] = useAtom(notificationAtom);
  const [__, setIsAuth] = useAtom(isAuthAtom);

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setNotification({
        message: t("loading"),
        isOpen: true,
        isAutoClose: false,
        type: "loading",
      });
    },
    onSuccess: ({
      data: {
        tokens: { access, refresh },
      },
    }) => {
      saveTokens(access, refresh);
      setIsAuth(true);
      setNotification({
        message: t("order.success"),
        isOpen: true,
        isAutoClose: true,
        type: "success",
      });
      navigate("/");
    },
  });

  const registerFunc: SubmitHandler<IRegisterForm> = async ({
    email,
    username,
    password,
    ava,
  }) => {
    const defaultAvaFile = await urlToFile(avaDefaultImage, "default-ava.png");
    console.log(ava[0] || defaultAvaFile);

    const form = new FormData();
    form.append("email", email);
    form.append("username", username);
    form.append("password", password);
    form.append("ava", ava[0] || defaultAvaFile);
    registerUser(form);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className=" py-[37px] h-screen text-white"
    >
      <div className="container max-w-[1320px] flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="max-w-6 md:max-w-full">
          <img src={arrowIcon} alt="arrow" />
        </button>
        <h1 className="text-4xl md:text-[64px] font-bold uppercase ">Sign Up</h1>
        <div></div>
      </div>
      <div className="sm:mt-24 md:mt-90 rounded-[40px_40px_0_0] md:rounded-[100px_100px_0_0] pt-[62px] bg-gray h-full mt-16">
        <div className="container">
          <div className="flex justify-center md:justify-between md:items-stretch items-center text-center flex-col md:flex-row">
            <div className="-mt-32 md:mt-0  flex-col flex justify-center items-center md:mb-0 mb-9">
              <label
                htmlFor="ava"
                className=" overflow-hidden   md:mb-70  h-[350px] lg:max-h-none md:max-w-72 md:max-h-72 lg:max-w-none w-full sm:max-w-36  max-h-36"
              >
                {watch("ava")?.[0] ? (
                  <img
                    alt="ava"
                    src={URL.createObjectURL(watch("ava")[0])}
                    className="w-full h-full object-cover rounded-circle max-w-32 max-h-32 mx-auto sm:max-w-36 sm:max-h-36 md:max-w-60 md:max-h-60 lg:max-w-none lg:max-h-none"
                  />
                ) : (
                  <img src={cameraIcon} alt="camera" className="max-w-32  md:max-w-72 md:w-56 lg:max-w-none sm:max-w-36 bg-white rounded-full lg:w-80 mx-auto"/>
                )}
                <input
                  id="ava"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  {...register("ava")}
                />
              </label>
              <span className="text-[#AFAFAF] lg:text-[32px] md:text-[28px] text-16">
                Add your profile photo
              </span>
            </div>
            <div className="flex-[0_1_250px] md:flex-[0_1_550px] mx-3">
              <Input
                icon={emailIcon}
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
                placeholder="Username"
                className="my-[48px]"
                error={errors.username}
                {...register("username", {
                  required: "Поле не может быть пустым",
                  minLength: { value: 2, message: "Минимум две буквы" },
                })}
              />
              <Input
                isPassword
                icon={passwordIcon}
                placeholder="your password"
                className=""
                error={errors.password}
                {...register("password", {
                  required: "Поле не может быть пустым",
                  minLength: { value: 5, message: "Минимум пять символов" },
                })}
              />
              <button
                disabled={!isValid || isPending}
                onClick={handleSubmit(registerFunc)}
                className="btn mt-[48px] rounded-[43px] py-[8px] px-80 font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="md:mt-[96px] md:text-[27px] text-18 text-center md:text-start max-w-64 md:max-w-none mx-auto mt-5 ">
            <span className=" text-green-white">
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
