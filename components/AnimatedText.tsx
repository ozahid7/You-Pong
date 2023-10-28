import React from 'react'

interface AnimatedTextProps{
    name: string
    size?: string
}

const AnimatedText = ({name , size}: AnimatedTextProps) => {
    const isMorethan:boolean = name.length > 7 ? true : false ;
    const childcustomClass = `${isMorethan  ? "animate-marquee" : "animate-m"} whitespace-nowrap`;

  return (
      <div className={`relative w-[40%] dred lg:flex justify-center hidden overflow-x-hidden px-2`}>
          <div className={childcustomClass}>
              <span className="text-white overflow-hidden font-bold md:text-2xl sm:text-xl lg:text-3xl drop-shadow-lg">
                  {name}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText