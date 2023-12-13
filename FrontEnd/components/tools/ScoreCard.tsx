import React, { ReactNode } from "react";

const ScoreCard = (props: { type?: string}) => {
  return (
      <div className="my_score max-w-[700px] score_card w-full h:w-[70%] p-1 bg-gray-500  h-full flex justify-center items-center">
          <div className="center w-full h-full flex justify-center items-center">
              <div className="flex w-full  h:w-[90%] justify-evenly h-full">
                  {" "}
                  <div className="flex items-center gap-2">
                      <img
                          className="border-2 min-w-[30px] max-w-[50px] xl:max-w-[50px] flex border-white rounded-sm object-contain"
                          src={"/avatar.jpeg"}
                          alt=""
                          width={90}
                          height={90}
                      />
                      <div className="text-white font-body hidden lg:flex font-[700] text:lg sm:text-xl lg:text-2xl">
                          <p>Ozahid-</p>
                      </div>
                  </div>
                  <div className="w-[40%] h-full flex justify-center items-center ">
                      <div className="w-[80%] h-[90%] flex flex-row justify-evenly items-center">
                          <span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
                              1
                          </span>
                          <span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
                              :
                          </span>
                          <span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
                              2
                          </span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="text-white font-body font-[700] hidden lg:flex text-lg sm:text-xl lg:text-2xl">
                          <p>Ozahid-</p>
                      </div>
                      <img
                          className="border-2 min-w-[30px] max-w-[50px] xl:max-w-[50px] flex border-white rounded-sm object-contain"
                          src={"/avatar.jpeg"}
                          alt=""
                          width={90}
                          height={90}
                      />
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ScoreCard;
