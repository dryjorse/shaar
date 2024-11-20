import { FC, useState, useRef } from "react";
import search from "../../assets/images/icons/search-loop.svg";

const MainPage: FC = () => {
  return (
    <>

      {/* Поиск */}
      <div className="max-w-[100vw] border-t-2 rounded-t-[35px] border-white  pt-12 w-full pb-20 bg-white mt-36 sm:mt-5">
        <div className="container ">
          <form action="" className="mb-8 relative mx-auto  sm:mt-8 ">
            <input
              type="text"
              name=""
              id=""
              className="border-2 border-borderGray bg-lightGray rounded-[42px] w-full h-10 pr-12 ps-4"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img src={search} alt="search-icon" className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      <hr className="border-0 bg-borderGray h-[1px]" />
    </>
  );
};

export default MainPage;
