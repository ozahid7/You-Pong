import React from 'react'

interface AnimatedTextProps{
    name: string
    size?: string
}

const AnimatedText = ({name , size}: AnimatedTextProps) => {
    const isMorethan:boolean = name.length > 7 ? true : false ;
    const childcustomClass = `${isMorethan  ? "animate-marquee" : "animate-m"} whitespace-nowrap`;

  return (
      <div className={`relative w-[120px] flex justify-center overflow-x-hidden`}>
          <div className={childcustomClass}>
              <span className="text-white overflow-hidden font-bold md:text-2xl sm:text-xl lg:text-3xl drop-shadow-lg">
                  {name}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText