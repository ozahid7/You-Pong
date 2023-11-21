"use client"
import { MyContainer } from '@/components'
import React from 'react'
import { LuSearch } from 'react-icons/lu';
import CustomTabs from './CustomTabs';

const page = () => {
  return (
      <div className="h-full min-h-[600px] w-full make_center">
          <div className="flex justify-center w-[80%] max-w-[900px] min-w-[260px] min-h-[600px] h-[80%]">
              <MyContainer>
                  <div className=" flex flex-col justify-center items-center h-[100%] overflow-y-auto">
                      <div className="w-full h-[90%] h:w-[90%] rounded-md bg-palette-grey border-[5px] flex flex-col items-center justify-around border-palette-white shadow-md ">
                          <div className="w-[94%] h-[16%] dred flex items-center ">
                              <span className="text-lg sm:text-2xl md:text-3xl xl:text-3xl drop-shadow-sm font-body text-cardtitle font-bold ">
                                  Friends
                              </span>
                          </div>
                          <div className="search_input_friends  w-[90%]  p-[2px] sm:max-h-[56px]   max-h-[46px] h-[10%] dred flex justify-center items-center">
                              <div className="center pl-3 outline-none w-full h-full  flex justify-center items-center overflow-hidden">
                                  <LuSearch className="h-7 w-7 text-placeholdercolor" />
                                  <input
                                      type="text"
                                      placeholder="Search"
                                      className="center text-cardtitle font-body placeholder:font-bold fold:placeholder:text-lg placeholder-placeholdercolor pl-5 outline-none h-full w-[84%]"
                                  />
                              </div>
                          </div>
                          <CustomTabs/>
                      </div>
                  </div>
              </MyContainer>
          </div>
      </div>
  );
}

export default page