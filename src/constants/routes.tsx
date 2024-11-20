import LoginPage from "../pages/loginPage/LoginPage";
import MainPage from "../pages/mainPage/MainPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import WelcomePage from "../pages/welcomePage/WelcomePage";

export const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
];
