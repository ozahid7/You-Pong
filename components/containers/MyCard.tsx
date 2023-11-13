import React from 'react'

const MyCard = ({type}: {type?: string}) => {

    
    const customclass = type === undefined ? "my_card" : "my_card_one_corner";

  return (
      <div className={`${customclass} w-full min-w-[300px] min-h-[100px] max-w-[600px] h-[100%] max-h-[400px] flex justify-center items-center m-auto`}>
          <div className="center fold:w-[96%] fold:h-[97%]  h-[95%] s:w-[97%] sm:w-[97%] md:w-[98%]  w-[92%] xl:h-[96%] xl:w-[98%] 2xl:[99%]"></div>
      </div>
  );
}

export default MyCard;