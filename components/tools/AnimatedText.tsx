import React from 'react'

interface AnimatedTextProps{
    name: string
    size?: string
    customclass?: string
}

const AnimatedText = ({name , size, customclass}: AnimatedTextProps) => {
    const isMorethan:boolean = name.length > 7 ? true : false ;
    const childcustomClass = `${isMorethan  ? "animate-marquee" : "animate-m"} whitespace-nowrap`;

  return (
      <div className={`${customclass} relative w-auto max-w-[130px] px-1 flex justify-center overflow-hidden`}>
          <div className={childcustomClass}>
              <span className="text-white overflow-hidden font-bold text-2xl md:text-3xl sm:text-2xl lg:text-4xl drop-shadow-lg">
                  {name}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText