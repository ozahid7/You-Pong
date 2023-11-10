import React from 'react'
import { MyDialog } from '..';



interface TwoFactorProps{
    isOpen: boolean
    closemodal: Function
}

const TwoFactor = ({isOpen, closemodal}: TwoFactorProps) => {



  return (
      <MyDialog
          isOpen={isOpen}
          closemodal={() => {
              closemodal(false);
          }}
          withCorner={false}
          customClass="absolute sm:h-[50%] sm:max-h-[520px] lg:max-h-[580px] h:max-h-[440px] max-h-[400px] max-w-[540px] h-[40%] md:w-[50%] w-[90%] s:w-[70%] min-h-[500px]"
      >
          <div className="flex items-center flex-col h-full overflow-auto">
            
          </div>
      </MyDialog>
  );
}

export default TwoFactor