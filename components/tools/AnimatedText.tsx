import React from 'react'

interface AnimatedTextProps{
    text: string
    customclass?: string
    limit: number
    maxwidth: string
    color: string
}

const AnimatedText = ({text , customclass, limit, maxwidth, color}: AnimatedTextProps) => {
    const isMorethan:boolean = text.length > limit ? true : false ;
    const childcustomClass = `${isMorethan  ? "animate-marquee" : "animate-m"} whitespace-nowrap`;

  return (
      <div className={`${customclass} relative w-auto ${maxwidth} px-1 flex justify-center overflow-hidden`}>
          <div className={childcustomClass}>
              <span className={`${color} overflow-hidden font-bold text-2xl md:text-3xl sm:text-2xl lg:text-4xl drop-shadow-lg`}>
                  {text}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText