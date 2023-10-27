import React from 'react'

interface AnimatedTextProps{
    name: string
    size: string
}

const AnimatedText = ({name , size}: AnimatedTextProps) => {
    const isMorethan:boolean = name.length > 5 ;

    const customClass = `py-12 animate-marquee whitespace-nowrap`;
  return (
      <div className={`relative w-[${size}] flex overflow-x-hidden`}>
          <div className={customClass}>
              <span className="text-white hidden  md:flex dred overflow-hidden font-bold text-4xl drop-shadow-lg">
                  {name}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText