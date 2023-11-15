import React from 'react'
import { twMerge } from 'tailwind-merge'

interface MyCardProps {
    children: React.ReactNode
    type?: string
    otherclass?: string
    midleclass?: string
}

const MyCard = ({children, type, otherclass, midleclass}: MyCardProps) => {

    
    const customclass = twMerge(  (type === undefined ? "my_card" : "my_card_one_corner ") +  " w-full p-[4px] sm:p-[5px] overflow-hidden z-10 min-w-[20px] min-h-[100px] max-w-[600px] h-[100%] max-h-[400px] flex justify-center items-center", otherclass);
    const customclass1 = twMerge(
        "center  overflow-hidden h-full flex justify-center items-center  w-full", midleclass
    );

  return ( 
      <div className={`${customclass}`}>
          <div className={`${customclass1} `}>
            {children}
          </div>
      </div>
  );
}

export default MyCard