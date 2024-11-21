import { FC } from "react";
import Search from "../../components/search/Search";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Filter from "../../components/filter/Filter";

const MainPage: FC = () => {
  const { search } = useLocation();

  const params: { category: string } = search
    .slice(1)
    .split("&")
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr.split("=")[0]]: curr.split("=")[1],
      }),
      { category: "" }
    );

  return <div className="relative pt-[130px]"></div>;
};

export default MainPage;
