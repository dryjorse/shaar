import { FC } from "react";
import searchIcon from "../../assets/images/icons/search.svg";
import voiceIcon from "../../assets/images/icons/voice.svg";

const Search: FC = () => {
  return (
    <div className="container rounded-[40px] border-2 border-[#D9D9D9] absolute top-[32px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4]">
      <button>
        <img src={searchIcon} alt="search" />
      </button>
      <input type="text" className="w-full" />
      <button>
        <img src={voiceIcon} alt="voice" />
      </button>
    </div>
  );
};

export default Search;
