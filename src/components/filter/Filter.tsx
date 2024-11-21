import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../constants/term.data";
import filterIcon from "../../assets/images/icons/filter.svg";
import starIcon from "../../assets/images/icons/star.svg";
import clsx from "clsx";
import { useAtom } from "jotai";
import { buildingsFilterAtom } from "../../store/store";
import { RatingsType } from "../../types/client.types";
import Slider from "@mui/material/Slider";
import { debounce } from "@mui/material";

const ratings: RatingsType[] = [5.0, 4.5, 4.0, 3.5, 3];

const Filter: FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [buildingFilter, setBuildingFilter] = useAtom(buildingsFilterAtom);
  const [pricesLocal, setPricesLocal] = useState([0, 0]);
  const [radiusLocal, setRadiusLocal] = useState([0, 0]);

  const { categories } = buildingFilter;

  const changePrice = useCallback(
    debounce((value) => {
      setBuildingFilter({ ...buildingFilter, price: value });
    }, 250),
    []
  );

  const changeRadius = useCallback(
    debounce((value) => {
      setBuildingFilter({ ...buildingFilter, radius: value });
    }, 250),
    []
  );

  const onChangePrices = (newValue: [number, number]) => {
    setPricesLocal(newValue);
    changePrice(newValue);
  };

  const onChangeRadius = (newValue: [number, number]) => {
    setRadiusLocal(newValue);
    changeRadius(newValue);
  };

  return (
    <>
      <div className="mx-[32px] mb-[15px] w-full h-[1px] bg-[#D9D9D9]"></div>
      <div className="container flex justify-between items-center">
        <ul className="flex gap-[12px]">
          <li>
            <Link
              to="/"
              onClick={() =>
                setBuildingFilter({
                  ...buildingFilter,
                  categories: [],
                })
              }
              className={clsx(
                "rounded-[11px] px-[15px] h-[46px] flex items-center bg-[#E7E7E7] font-bold text-[14px] text-green-2 btn shadow-hidden animate-def hover:translate-y-[-5px]",
                { "!bg-green-2 !text-white": !categories.length }
              )}
            >
              All
            </Link>
          </li>
          {categoriesData.map((category) => (
            <li key={category}>
              <Link
                to={`/buildings`}
                onClick={() =>
                  setBuildingFilter({
                    ...buildingFilter,
                    categories: [category],
                  })
                }
                className={clsx(
                  "rounded-[11px] px-[15px] h-[46px] flex items-center bg-[#E7E7E7] font-bold text-[14px] text-green-2 btn shadow-hidden animate-def hover:translate-y-[-10px]",
                  { "!bg-green-2 !text-white": categories.includes(category) }
                )}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={clsx(
              "relative btn bg-green-3 rounded-[11px] px-[21px] py-[14px] shadow-hidden flex gap-[16px] items-center text-[14px] font-bold z-[5] !shadow-[1px_1px_20px_rgba(0,0,0,0.5)] hover:!shadow-[1px_1px_20px_rgba(0,0,0,0.5)]",
              { "!bg-white text-green-3": isFilterOpen }
            )}
          >
            <div
              className={clsx("w-[17px] h-[17px] bg-white animate-def", {
                "!bg-green-3": isFilterOpen,
              })}
              style={{
                maskImage: `url(${filterIcon})`,
                maskPosition: "center",
                maskSize: "cover",
                maskRepeat: "no-repeat",
              }}
            ></div>
            <span>Filter</span>
          </button>
          <div
            className={clsx(
              "absolute z-[1] top-[-15px] right-[-47px] rounded-[15px] pt-[114px] pb-[34px] pl-[15px] pr-[17px] max-w-[455px] w-screen bg-green-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none max-h-[0px] animate-def",
              { "max-h-screen opacity-100 pointer-events-auto": isFilterOpen }
            )}
          >
            <div className="rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">Rating</h3>
              <div className="mt-[6px] flex gap-[10px]">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setBuildingFilter({ ...buildingFilter, rating })
                    }
                    className={clsx(
                      "btn border-2 rounded-[8px] py-[4px] pl-[7px] pr-[4px] shadow-hidden flex gap-[2px] text-[16px] font-bold hover:!shadow-[1px_1px_10px_rgba(0,0,0,0.5)] text-green-white bg-white",
                      {
                        "border-2 !bg-green-white !text-white":
                          buildingFilter.rating === rating,
                      }
                    )}
                  >
                    <span>{rating}+</span>
                    <img src={starIcon} alt="star" />
                  </button>
                ))}
              </div>
            </div>
            <div className="my-30 rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">Price</h3>
              <Slider
                value={pricesLocal}
                onChange={(_, newValue) =>
                  onChangePrices(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                sx={{ color: "#237B52" }}
                valueLabelFormat={(value: number) => `${value} som`}
              />
            </div>
            <div className="my-30 rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">Category</h3>
              <div className="mt-[6px] flex flex-wrap gap-x-[9px] gap-y-[14px]">
                {categoriesData.map((category) => (
                  <button
                    onClick={() =>
                      setBuildingFilter({
                        ...buildingFilter,
                        categories: categories.includes(category)
                          ? categories.filter((ctg) => ctg !== category)
                          : [...categories, category],
                      })
                    }
                    className={clsx(
                      "rounded-[8px] border-2 border-green-white py-[7px] pl-[12px] pr-20 btn text-[12px] font-bold shadow-hidden text-green-white bg-white",
                      {
                        "!bg-green-white text-white":
                          categories.includes(category),
                      }
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="my-30 rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">Radius</h3>
              <Slider
                min={0}
                max={12000}
                value={radiusLocal}
                onChange={(_, newValue) =>
                  onChangeRadius(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                sx={{ color: "#237B52" }}
                valueLabelFormat={(value: number) =>
                  value < 1000
                    ? `${value} m`
                    : `${(value / 1000).toFixed(2)} km`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
