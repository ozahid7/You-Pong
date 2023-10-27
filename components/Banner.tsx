import React from 'react'

const Banner = () => {
     const from = "#508286";
     const to = "#9DBBBD";
  return (
      <div className=" flex overflow-clip rounded-sm h-[12%] w-[60%] min-w-[240px]">
          <div className="w-[6%] sm:w-[3%] max-w-[600px] max-h-[100px] sm:min-h-full bg-palette-green"></div>
          <div
              className={`w-full max-w-[600px] max-h-[100px] sm:min-h-full  bg-gradient-to-r from-[${from}] to-[${to}] pl-6 flex items-center justify-between pr-6`}
          >
              <div className="w-[18%] pb-[18%] min-w-[80px] min-h-[80px]  relative">
                  <img
                      className=" h-[100%] w-[100%] absolute rounded-md"
                      src="/ozahid-.jpeg"
                      alt=""
                  />
              </div>
              <span className="text-white hidden text-xl md:flex font-bold sm:text-4xl drop-shadow-lg">
                  OZAHID
              </span>
              <span className="text-white text-4xl sm:flex font-bold sm:text-4xl pl-3 sm:pl-0 drop-shadow-lg">
                  7 : 0
              </span>
          </div>
      </div>
  );
}

export default Banner