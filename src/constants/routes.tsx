import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import WelcomePage from "../pages/welcomePage/WelcomePage";
import Layout from "./layout";
export const router = createBrowserRouter([
  {
    id: "root",
    element: <Layout />,
    children: [{ path: "/", element: <MainPage /> }],
  },
  { path: "/welcome", element: <WelcomePage /> },
]);
