import { FC, useState, useRef } from "react";
import search from "../../assets/images/icons/search-loop.svg";
import weater from "../../assets/images/weather.png";
import airQA from "../../assets/images/airQA.png";
import Card from "../../components/ui/modal/Card";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainPage: FC = () => {
  const cards = [
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 4.5,
      pricePerNight: "160$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 4.2,
      pricePerNight: "120$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
    {
      image: "https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg",
      rating: 5.0,
      pricePerNight: "200$",
    },
  ];
  return (
    <>
      {/* Поиск */}
      <div className="max-w-[100vw] border-t-2 rounded-t-[35px] border-white  pt-12 w-full pb-20 bg-white mt-36 sm:mt-5">
        <div className="container ">
          <form
            action=""
            className="mb-8 relative mx-auto hidden sm:block  sm:mt-8 "
          >
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

          <div className="flex gap-10">
            <div className="flex h-16 relative w-36 sm:w-44 shadow-md rounded-r-2xl">
              <h3
                className="bg-[#55B0FF] text-white py-4 px-2 text-2xl sm:text-3xl font-bold rounded-s-xl rounded-r-[150px] z-10 text-gray-800"
                style={{
                  textShadow:
                    "0px 1px 2px 0px #0000001A, 2px 4px 4px 0px #00000017",
                }}
              >
                °10
              </h3>

              <div
                className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
                style={{
                  background:
                    "linear-gradient(89.83deg, #1A90F7 0.14%, #1572C3 71.56%, #0F5491 99.86%)",
                }}
              >
                <span>
                  {" "}
                  <img src={weater} alt="weater icon" className="-mt-1 -ms-4" />
                </span>
              </div>
            </div>
            <div className="flex h-16 relative w-36 sm:w-44 shadow-md rounded-r-2xl">
              <h3
                className=" bg-[#33BC7C] py-4 px-3 text-2xl sm:text-3xl font-bold rounded-s-xl w-[73px] rounded-r-[150px] z-10 text-white [text-shadow:_10px_10px_50px_#000]"
                // style={{
                //   textShadow: '0px 1px 2px 0px #0000001A, 2px 4px 4px 0px #00000017, 4px 9px 6px 0px #0000000D, 7px 17px 7px 0px #00000003, 10px 26px 8px 0px #00000000',
                // }}
              >
                322
              </h3>
              <div
                className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
                style={{
                  background:
                    "linear-gradient(89.99deg, #43BB83 0.01%, #3CA976 17.41%, #2E825A 88.89%, #1E553C 99.99%)",
                }}
              >
                <span>
                  {" "}
                  <img
                    src={airQA}
                    alt="weater icon"
                    className="-mt-3 ms-4 sm:-mt-3 sm:ms-6"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className=" mt-8 overflow-hidden">
            <h3 className="text-[#237B52] font-bold text-2xl mb-4">
              Popular Hotels
            </h3>
            <Swiper
              spaceBetween={3}
              slidesPerView="auto"
              pagination={{ clickable: true }}
              className="w-full max-w-4xl"
            >
              <SwiperSlide className="flex justify-start gap-6 ">
                {cards.map((hotel, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center max-w-5xl"
                  >
                    <Card {...hotel} />
                  </SwiperSlide>
                ))}
              </SwiperSlide>
              <SwiperSlide className="flex justify-center">
                {/* Другой слайд */}
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <hr className="border-0 bg-borderGray h-[1px] hidden sm:block" />
    </>
  );
};

export default MainPage;
