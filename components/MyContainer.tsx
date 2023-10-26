import React from "react";
import "../dist/input.css";

const MyContainer = () => {
    return (
        <div className="bg-white w-[90%] h-[84vh] flex rounded-sm relative overflow-auto">
            {/* <!--content container(the div in center) --> */}
            <div className="h-[90%] w-[90%] min-w-[20px] flex-col justify-center items-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                {/* <!-- my card  --> */}
                <div className="my_card w-[70%] min-w-[200px] min-h-[100px] h-[30%] flex justify-center items-center m-auto">
                    <div className="center fold:w-[96%] fold:h-[97%]  h-[95%] s:w-[97%] sm:w-[97%] md:w-[98%] w-[92%] xl:h-[94%] xl:w-[98%] 2xl:[99%]"></div>
                </div>

                {/* <!-- button--> */}
                <div className="my_button max-w-[400px]  w-[60%] min-w-[120px] max-h-[55px] sm:max-h-[70px]   min-h-[45px] h-[12%] flex justify-center items-center m-auto">
                    <div className="center  fold:w-[95%]  h-[90%] s:w-[96%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden">
                        <text className="text-white drop-shadow-lg font-bold font-body fold:text-md h:text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                            GET STARTED
                        </text>
                    </div>
                </div>
                {/* <!-- intra login --> */}
                <div className="intra_login max-w-[400px]  w-[60%] min-w-[120px] max-h-[55px] sm:max-h-[70px]   min-h-[45px] h-[12%] flex justify-center items-center mt-10 m-auto">
                    <div className="center fold:w-[95%]  h-[90%] s:w-[96%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden">
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
                            <text className="text-white drop-shadow-lg font-bold font-body fold:text-lg h:text-lg sm:text-2xl md:text-3xl ">
                                Login with Intra
                            </text>
                        </div>
                    </div>
                </div>

                {/* <!-- input box --> */}
                <div className="my_input max-w-[400px]  w-[60%] min-w-[120px] max-h-[50px] sm:max-h-[60px]   min-h-[45px] h-[12%] flex justify-center items-center mt-10 m-auto ">
                    <input
                        type="text"
                        placeholder="Email"
                        className="center placeholder-placeh pl-5 outline-none  fold:w-[95%]  h-[86%] s:w-[96%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden"
                    />
                </div>

                {/* <!-- banner --> */}

                <div className="dblue w-[60%] h-[12%] max-w-[500px] mt-10 mx-auto flex justify-center items-center overflow-hidden">
                    <div className="w-[18%] pb-[18%] min-w-[50px] min-h-[50px] bg-purple-300 relative">
                        <img
                            className="h-[100%] w-[100%] absolute"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* <!-- top bar orange --> */}
            <div className="min-w-[60px] flex h-[2%] min-h-[11px] w-[50%] max-w-xl absolute left-[50%] translate-x-[-50%] overflow-clip">
                <div className="w-[60%] h-[100%] absolute right-0">
                    <div className="right w-[100%] h-[100%]"></div>
                </div>
                <div className="w-[60%] h-[100%] absolute">
                    <div className="left w-[100%] h-[100%]"></div>
                </div>
            </div>

            {/* <!-- green bar center in left --> */}
            <div className="hide overflow-hidden max-w-[20px]  h-[60%] w-[4%] min-w-[11px] hidden s:flex min-h-[80px] absolute top-[50%] translate-y-[-50%]">
                <div className="w-[100%] h-[50%] absolute">
                    <div className="ltop w-[100%] h-[100%]"></div>
                </div>
                <div className="w-[100%] h-[60%] absolute bottom-0">
                    <div className="lbottom w-[100%] h-[100%]"></div>
                </div>
            </div>

            {/* <!-- green bar center in right --> */}
            <div className="hide overflow-hidden max-w-[20px]  h-[60%] w-[4%] min-w-[11px] hidden s:flex min-h-[80px] absolute right-0 top-[50%] scale-x-[-1] translate-y-[-50%]">
                <div className="w-[100%] h-[50%] absolute">
                    <div className="ltop w-[100%] h-[100%]"></div>
                </div>
                <div className="w-[100%] h-[60%] absolute bottom-0">
                    <div className="lbottom w-[100%] h-[100%]"></div>
                </div>
            </div>

            {/* <!-- top left corner --> */}

            <div className="hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden relative">
                {/* <!-- left --> */}
                <div className="h-[100%] w-[18%] sm:max-w-[14px] min-w-[10px] absolute">
                    <div className="w-[100%] h-[100%]">
                        <div className="ctleft w-[100%] h-[100%]"></div>
                    </div>
                </div>

                {/* <!-- top --> */}
                <div className="corner w-[100%] h-[15%] min-h-[10px] absolute">
                    <div className=" w-[100%] h-[100%]">
                        <div className="flex w-[100%] h-[100%]">
                            <div className="w-[100%] h-[100%]">
                                <div className="cttop w-[100%] h-[100%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- right top corner --> */}

            <div className="hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute top-0 right-0">
                {/* <!-- top --> */}
                <div className="corner w-[100%] h-[15%] min-h-[10px] absolute">
                    <div className=" w-[100%] h-[100%]">
                        <div className="flex w-[100%] h-[100%]">
                            <div className="w-[100%] h-[100%]">
                                <div className="crtop w-[100%] h-[100%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- left --> */}
                <div className="h-[100%] w-[18%] sm:max-w-[14px] min-w-[10px] absolute right-0">
                    <div className="w-[100%] h-[100%]">
                        <div className="crtop w-[100%] h-[100%]"></div>
                    </div>
                </div>
            </div>

            {/* <!-- bottom right corner --> */}
            <div className="hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute bottom-0 right-0">
                {/* <!-- top --> */}
                <div className="w-[100%] h-[15%] min-h-[10px] absolute bottom-0">
                    <div className=" w-[100%] h-[100%]">
                        <div className="flex w-[100%] h-[100%]">
                            <div className="w-[100%] h-[100%]">
                                <div className="crbottom w-[100%] h-[100%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- left --> */}
                <div className="h-[100%] w-[18%] sm:max-w-[14px] min-w-[10px] absolute right-0">
                    <div className="w-[100%] h-[100%]">
                        <div className="crbottom w-[100%] h-[100%]"></div>
                    </div>
                </div>
            </div>

            {/* <!-- bottom left corner --> */}
            <div className="hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute bottom-0 left-0  scale-y-[-1]">
                {/* <!-- left --> */}
                <div className="h-[100%] w-[18%] sm:max-w-[14px] min-w-[10px] absolute">
                    <div className="w-[100%] h-[100%]">
                        <div className="ctleft w-[100%] h-[100%]"></div>
                    </div>
                </div>

                {/* <!-- top --> */}
                <div className="corner w-[100%] h-[15%] min-h-[10px] absolute">
                    <div className=" w-[100%] h-[100%]">
                        <div className="flex w-[100%] h-[100%]">
                            <div className="w-[100%] h-[100%]">
                                <div className="cttop w-[100%] h-[100%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContainer;
