import { FC, useState, useRef } from "react";
import search from "../../assets/images/icons/search-loop.svg";
import weater from "../../assets/images/weather.png";
import airQA from "../../assets/images/airQA.png";

const MainPage: FC = () => {
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
                    "0px 1px 2px 0px #0000001A, 2px 4px 4px 0px #00000017"
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

          <div>
            <h3 className="text-[#237B52] font-bold text-2xl mt-8">Popular hotels</h3>
            <div>
              <img src="https://www.ahstatic.com/photos/a145_ho_00_p_1024x768.jpg" alt="" className="w-40 h-40 rounded-3xl"/>
              <div className="ms-3 text-[#2C9765] font-medium flex">
                <span className="me-1 flex items-center">4.5 / 5 <svg width="12" className="ms-1" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.2415 8.38353C8.55808 8.54763 7.84463 8.53968 7.16504 8.36039C6.48545 8.1811 5.86094 7.83606 5.34742 7.35619C4.8339 6.87631 4.44741 6.27656 4.22255 5.61066C3.9977 4.94475 3.9415 4.23348 4.059 3.54053C4.04139 3.55808 4.02251 3.57429 4.0025 3.58903C3.8625 3.69553 3.6875 3.73503 3.3375 3.81403L3.02 3.88603C1.79 4.16453 1.175 4.30353 1.0285 4.77403C0.882495 5.24403 1.3015 5.73453 2.14 6.71503L2.357 6.96853C2.595 7.24703 2.7145 7.38653 2.768 7.55853C2.8215 7.73103 2.8035 7.91703 2.7675 8.28853L2.7345 8.62703C2.608 9.93553 2.5445 10.5895 2.9275 10.88C3.3105 11.1705 3.8865 10.906 5.0375 10.3755L5.336 10.2385C5.663 10.0875 5.8265 10.0125 6 10.0125C6.1735 10.0125 6.337 10.0875 6.6645 10.2385L6.962 10.3755C8.11349 10.9055 8.68949 11.1705 9.07199 10.8805C9.45549 10.5895 9.392 9.93553 9.2655 8.62703L9.2415 8.38353Z" fill="#E2CA19"/>
<path opacity="0.5" d="M4.57647 2.704L4.41247 2.998C4.23247 3.321 4.14247 3.4825 4.00247 3.589C4.02247 3.574 4.04131 3.55783 4.05897 3.5405C3.94145 4.2335 3.99764 4.94484 4.22252 5.61079C4.4474 6.27675 4.83394 6.87653 5.34752 7.35642C5.86111 7.83632 6.4857 8.18134 7.16536 8.36058C7.84502 8.53983 8.55852 8.5477 9.24197 8.3835L9.23197 8.2885C9.19647 7.917 9.17847 7.731 9.23197 7.5585C9.28547 7.3865 9.40447 7.247 9.64297 6.9685L9.85997 6.715C10.6985 5.735 11.1175 5.2445 10.971 4.774C10.825 4.3035 10.21 4.164 8.97997 3.886L8.66197 3.814C8.31247 3.735 8.13747 3.6955 7.99697 3.589C7.85697 3.4825 7.76697 3.321 7.58697 2.998L7.42347 2.704C6.78997 1.568 6.47347 1 5.99997 1C5.52647 1 5.20997 1.568 4.57647 2.704Z" fill="#E2CA19"/>
</svg>
</span>
                <span>160$/nigth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-0 bg-borderGray h-[1px] hidden sm:block" />
    </>
  );
};

export default MainPage;
