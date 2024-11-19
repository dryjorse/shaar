import MainPage from "../pages/mainPage/MainPage";
import WelcomePage from "../pages/welcomePage/WelcomePage";

export const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/welcome", element: <WelcomePage /> },
];
