import React from "react";
import PropTypes from "prop-types";

interface Props {
  elements: string;
  border: string;
}

export function Map({ elements, border }: Props) {
  return (
    <div className="flex bg-[#EFF5F5] w-[85%] h-full shadow-md justify-center items-center">
      <button className={`flex border-[6px] border-[${border}] shadow-lg rounded-sm w-[90%] h-[90%] xxs:border-[2px] items-center justify-center`}>
        <div className="flex w-[95%] h-[95%] justify-between flex-col items-center">
          <div className={`flex bg-[${elements}] w-[35%] h-[3%]`}></div>
          <div className={`flex bg-[${elements}] rounded-full xxs:w-[5px] xxs:h-[5px]`}></div>
          <div className={`flex bg-[${elements}] w-[35%] h-[3%]`}></div>
        </div>
      </button>
    </div>
  );
}

Map.propTypes = {
  elements: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
};

export default Map;
