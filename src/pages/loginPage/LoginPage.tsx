import { FC } from "react";
import bannerImage from "../../assets/images/login-banner.jpg";
import bgImage from "../../assets/images/background.jpg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile-green.svg";
import arrowIcon from "../../assets/images/icons/arrow-green.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ILoginForm } from "../../types/client.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom, notificationAtom } from "../../store/store";
import { useTranslation } from "react-i18next";
import { saveTokens } from "../../constants/helpers";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ mode: "onTouched" });
  const [_, setNotification] = useAtom(notificationAtom);
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const { t } = useTranslation();

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
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

  const loginFunc: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <div
        className="pt-70 px-60 flex-[0_1_810px]"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <button onClick={() => navigate(-1)}>
          <img src={arrowIcon} alt="arrow" />
        </button>
      </div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="pl-[67px] bg-cover flex-auto text-white text-center"
      >
        <div className="mx-auto max-w-[520px]">
          <h1 className="text-[128px] font-bold [text-shadow:_1px_1px_8px_black] uppercase">
            Sign In
          </h1>
          <Input
            icon={profileIcon}
            className="mt-[133px] mb-40 bg-white"
            inputClassName="!text-black"
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
            isPassword
            icon={profileIcon}
            className="mt-40 mb-30 bg-white"
            inputClassName="!text-black"
            placeholder="your password"
            error={errors.password}
            {...register("password", {
              required: "Поле не может быть пустым",
              minLength: { value: 5, message: "Минимум пять символов" },
            })}
          />
          <button
            disabled={!isValid || isPending}
            onClick={handleSubmit(loginFunc)}
            className="btn mt-[132px] mb-[27px] rounded-[43px] px-[102px] py-[18px] bg-white text-green-white font-bold text-[40px]"
          >
            Sign In
          </button>
          <span className="block text-[24px]">
            Don't hava an account?{" "}
            <Link to="/register" className="text-green-black font-bold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
