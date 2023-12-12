import React from "react";

interface Props {
  elements: string;
  border: string;
  background: string;
  name?: string;
  handelClick: any
}

function Map({ elements, border, background, name, handelClick }: Props) {
  if (elements == "#497174") name = "Green";
  else if (elements == "#EB6440") name = "Orange";
  else name = "Classic";
  return (
      <div onClick={handelClick} className="flex h-1 min-h-[110px] sm:min-h-[160px] lg:min-h-[200px] h:w-[50%] w-[70%] md:w-[30%] md max-w-[300px] justify-center flex-col items-center">
          <div
              style={{ background: `${background}` }}
              className={`flex w-[85%] h-full shadow-md justify-center items-center flex-col rounded-sm`}
          >
              <button
                  style={{ borderColor: `${border}` }}
                  className={`flex shadow-lg rounded-sm w-[90%] h-[90%] outline-none focus:ring focus:ring-orange-500 border-[2px] lg:border-4 items-center justify-center hover:scale-110 transform-gpu btn btn-ghost`}
              >
                  <div className="flex w-[95%] h-[95%] justify-between flex-col items-center ">
                      <div
                          style={{ background: `${elements}` }}
                          className={`flex w-[35%] h-[3%] 2xl_:w-[32%]`}
                      ></div>
                      <div
                          style={{ background: `${elements}` }}
                          className={`flex rounded-full w-[6px] h-[6px] sm_:w-[6px] sm_:h-[6px] md_:w-[7px] md_:h-[7px] lg_:w-[8px] lg_:h-[8px] 2xl_:w-[10px] 2xl_:h-[10px] 3xl_:w-[11px] 3xl_:h-[11px]`}
                      ></div>
                      <div
                          style={{ background: `${elements}` }}
                          className={`flex w-[35%] h-[3%]`}
                      ></div>
                  </div>
              </button>
          </div>
          <div className="font-['Chakra_Petch'] text-[11px] s:text-[13px] sm_:text-[15px] md_:text-[16px] lg_:text-[18px] xl_:text-[20px] 2xl_:text-[22px] text-[#686868] font-[700] w-fit h-fit underline">
              {name} map
          </div>
      </div>
  );
}

export default Map;
