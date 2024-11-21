import { FC } from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Search from "../../components/search/Search";
import Filter from "../../components/filter/Filter";

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <main className="relative pt-[130px] min-h-[calc(100vh-61px)] bg-gray-bg">
        <Search />ч
        <Filter />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
