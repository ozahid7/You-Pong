import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <div className="search_input_chat w-[94%] h-[7%] flex justify-center items-center ">
      <div className="center w-[97%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
        <LuSearch className="h-7 w-7 text-[#9C9C9C]" />
        <input
          type="text"
          placeholder="Search"
          className="center text-[#9C9C9C] 2xl:text-[26px] xl:text-[22px] lg:text-[20px] md:text-[18px] xs:text-[15px] font-body placeholder:font-[600] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
