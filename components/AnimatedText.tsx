import React from 'react'

interface AnimatedTextProps{
    name: string
    size: string
}

const AnimatedText = ({name , size}: AnimatedTextProps) => {
    const isMorethan:boolean = name.length > 7 ? true : false ;
    const customClass = `py-12  animate-${isMorethan ? "marquee" : "m"} whitespace-nowrap`;

  return (
      <div className={`relative w-[${size}] flex overflow-x-hidden px-2`}>
          <div className={customClass}>
              <span className="text-white hidden  md:flex dred overflow-hidden font-bold md:text-2xl lg:text-4xl drop-shadow-lg">
                  {name}
              </span>
          </div>
      </div>
  );
}

export default AnimatedText