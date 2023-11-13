import React from 'react'

interface MyCardProps {
    children: React.ReactNode
    type?: string
    otherclass?: string
    midleclass?: string
}

const MyCard = ({children, type, otherclass, midleclass}: MyCardProps) => {

    
    const customclass = type === undefined ? "my_card" : "my_card_one_corner";

  return ( 
      <div className={`${customclass} ${otherclass} w-full overflow-hidden z-10 min-w-[20px] min-h-[100px] max-w-[600px] h-[100%] max-h-[400px] flex justify-center items-center `}>
          <div className={`${midleclass} center fold:w-[96%] fold:h-[97%] overflow-hidden h-[95%] s:w-[97%] sm:w-[97%] md:w-[98%] flex justify-center items-center  w-[92%] xl:h-[96%] xl:w-[98%] 2xl:[99%]`}>
            {children}
          </div>
      </div>
  );
}

export default MyCard