import { FC } from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-61px)] bg-gray-bg">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
