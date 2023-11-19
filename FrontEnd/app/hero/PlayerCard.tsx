'use client'

import { MiniBanner, MyCard } from '@/components';
import React, { useState } from 'react'
import { ImUserMinus, ImUserPlus } from 'react-icons/im';
import { MdOutlineSettings } from 'react-icons/md';

const PlayerCard = () => {

  let [Icon, setIcon] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const isOnline = false;

  const hideIcon = () => {
      setIcon(!Icon);
  };

  return (
      <div className="flex justify-center w-[90%] md:w-full overflow-hidden min-h-[180px] max-w-[600px] h:min-h-[204px] h-[20%] md:h-[30%] h:h-[24%]">
          <MyCard otherclass="">
              <div className="w-full relative justify-between items-center flex h-full">
                  <h3 className=" whitespace-nowrap absolute top-2 left-4 sm:left-8 sm:top-4   text-cardtitle  text-[12px] h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
                      Player Card
                  </h3>
                  <div className="sm:w-[40%] w-[34%] md:pt-4 flex flex-col justify-center items-center h-[60%] md:h-[80%]">
                      <div className="w-[80%] pt-4 md:pt-2 h-[90%] md:w-[60%] md:pb-[60%] xl:w-[80%] xl:h-[80%] relative">
                          <img
                              className=" h-[100%] w-[100%] absolute object-contain rounded-md"
                              src="/ozahid-.jpeg"
                              alt="avatar"
                          />
                      </div>
                  </div>
                  <div className="w-[62%] h-full pr-1 sm:pr-0 flex flex-col items-center justify-center pt-1 sm:pt-2 relative">
                      <MdOutlineSettings
                          size={120}
                          className="z-10 h-5 w-5 sm:h-[12%]  sm:w-[12%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
                      />
                      {Icon ? (
                          <ImUserMinus
                              onClick={hideIcon}
                              size={120}
                              className="z-10 h-[20%] w-[20%] s:h-[14%] s:w-[14%] absolute sm:bottom-6 sm:right-2 bottom-3 right-3  text-cardtitle cursor-pointer"
                          />
                      ) : (
                          <ImUserPlus
                              onClick={hideIcon}
                              size={120}
                              className="z-10 h-[14%] w-[14%] absolute h:bottom-6 h:right-2 bottom-4 right-1  text-cardtitle cursor-pointer"
                          />
                      )}
                      <div className="sm:w-[86%] h-[76%] mt-4 w-full flex flex-col justify-evenly space-y-1 relative">
                          <div className=" w-full space-x-1  flex">
                              <h2 className="font-extrabold mt-2 font-black text-2xl h:text-3xl sm:text-4xl md:text-4xl text-cardtitle drop-shadow">
                                  OZAHID-
                              </h2>
                              <span className="relative flex h-2 w-2  sm:h-3 sm:w-3">
                                  <span
                                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                          isOnline
                                              ? "bg-green-500"
                                              : "bg-red-500"
                                      }  opacity-75`}
                                  ></span>
                                  <span
                                      className={`relative inline-flex rounded-full w-2 h-2 sm:h-3 sm:w-3 ${
                                          isOnline
                                              ? "bg-green-600"
                                              : "bg-red-600"
                                      } `}
                                  ></span>
                              </span>
                          </div>
                          <div className="flex flex-col justify-between h-auto space-y-3 w-[80%] sm:w-[90%]">
                              <MiniBanner
                                  isGreen={true}
                                  value="69"
                                  name="Level"
                              />

                              <MiniBanner
                                  isGreen={false}
                                  value="10"
                                  name="Rank"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </MyCard>
      </div>
  );
}

export default PlayerCard