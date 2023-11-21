import MyToggle from '@/components/tools/MyToggle';
import React from 'react'
import { LuMessageSquarePlus } from "react-icons/lu";


const FriendBanner = () => {
  return (
      <div className="h-full w-full min-h-[60px] bg-palette-white rounded-sm drop-shadow-lg flex justify-around items-center">
          <div className="h-full items-center space-x-2 md:space-x-4 flex">
              <img
                  src="/ozahid-.jpeg"
                  alt="logo"
                  className="h-10  object-contain border-2 max-w-[220px] max-h-[220px] border-white  rounded-md sm:h-14 md:h-16"
              />
              <div className="flex flex-col">
                  <span className="font-body text-palette-green text-lg font-semibold">
                      Ozahid-
                  </span>
                  <span className="font-light text-sm">Offline</span>
              </div>
          </div>
          <div className="flex space-x-2 md:space-x-8">
              <LuMessageSquarePlus
                  size={35}
                  className="cursor-pointer mt-1 text-cardtitle"
              />
              <MyToggle
                  otherclass="h-[38px] hidden sm:flex min-w-[120px]"
                  handelCheck={() => {
                      
                  }}
                  Default='unblock'
                  enable='block'
              />
          </div>
      </div>
  );
}

export default FriendBanner