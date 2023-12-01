import React, { MouseEventHandler } from 'react'

const IntraButton = ({type}: { type: string }) => {

    const buttoncontent = type === 'login' ? 'Login Intra' : 'Sign Up Intra';
    return (
        <button className="intra_login max-w-[400px]  w-[100%] min-w-[120px] max-h-[55px] sm:max-h-[70px] p-[2px] sm:p-[3px]  min-h-[45px] h-[100%] flex justify-center items-center">
            <div className="center  h-full w-full flex justify-center items-center overflow-hidden">
                <div className="h:pl-2 min-w-[40px]  max-w-[70px] w-[22%] h-[80%] flex items-center overflow-hidden pr-2 sm:pr-3 pt-1 h:border-r-2 border-gray-300">
                    <svg
                        width="57"
                        height="35"
                        viewBox="0 0 57 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M56.9666 20.9969L46.4563 31.4764H56.9666V20.9969ZM46.4563 10.5127L35.9792 20.9993V31.4764H46.4563V20.9969L56.9666 10.5127V0.002374H46.4563V10.5127ZM35.9792 10.5127L46.4563 0.002374H35.9792V10.5127ZM0 29.4849H20.9875V40H31.4598V20.9969H10.5103L31.4598 0H20.9875L0 20.9993L0 29.4849Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div className="h-[100%] w-[78%] hidden h:flex items-center justify-center">
                    <span className="text-white drop-shadow-lg font-bold font-body fold:text-lg h:text-lg sm:text-2xl lg:text-3xl ">
                        {buttoncontent}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default IntraButton