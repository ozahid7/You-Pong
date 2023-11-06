"use client";
import React from "react";
import { CustomButton, IntraButton, MyCard } from "..";
import { MdCancelPresentation } from "react-icons/md";

interface MyContainerProps {
  children: React.ReactNode;
  withCorners?: boolean;
  closeModal: () => void;
}

export function MyContainer({
  children,
  withCorners,
  closeModal,
}: MyContainerProps) {
  const customclass = withCorners ? "hidden" : "";
  const otherclass = withCorners ? "s:hidden" : "";
  return (
    <div className="bg-white w-full h-full flex rounded-sm relative overflow-auto">
      <script src="https://cdn.jsdelivr.net/npm/p5@1.8.0/lib/p5.js"></script>
      <MdCancelPresentation
        onClick={closeModal}
        size={25}
        className="absolute z-10 text-gray-400 h:top-6 cursor-pointer h:left-8 top-4 left-4  rounded-sm"
      />
      {/* <!--content container(the div in center) --> */}
      <div className=" h-[90%] w-[90%] min-w-[20px] flex-col justify-center items-center absolute top-[50%] overflow-auto translate-y-[-50%] left-[50%] translate-x-[-50%]">
        {children}
      </div>

      {/* <!-- top bar orange --> */}
      <div
        className={`${customclass} min-w-[60px] flex h-[2%] min-h-[11px] w-[50%] max-w-xl absolute left-[50%] translate-x-[-50%] overflow-clip`}
      >
        <div className="w-[60%] h-[100%] absolute right-0">
          <div className="right w-[100%] h-[100%]"></div>
        </div>
        <div className="w-[60%] h-[100%] absolute">
          <div className="left w-[100%] h-[100%]"></div>
        </div>
      </div>

      {/* <!-- green bar center in left --> */}
      <div
        className={`${otherclass} hide overflow-hidden max-w-[16px]  h-[60%] w-[2%] min-w-[11px] hidden s:flex min-h-[80px] absolute top-[50%] translate-y-[-50%]`}
      >
        <div className="w-[100%] h-[50%] absolute">
          <div className="ltop w-[100%] h-[100%]"></div>
        </div>
        <div className="w-[100%] h-[60%] absolute bottom-0">
          <div className="lbottom w-[100%] h-[100%]"></div>
        </div>
      </div>

      {/* <!-- green bar center in right --> */}
      <div
        className={`${otherclass} hide overflow-hidden max-w-[16px]  h-[60%] w-[2%] min-w-[11px] hidden s:flex min-h-[80px] absolute right-0 top-[50%] scale-x-[-1] translate-y-[-50%]`}
      >
        <div className="w-[100%] h-[50%] absolute">
          <div className="ltop w-[100%] h-[100%]"></div>
        </div>
        <div className="w-[100%] h-[60%] absolute bottom-0">
          <div className="lbottom w-[100%] h-[100%]"></div>
        </div>
      </div>

      {/* <!-- top left corner --> */}

      <div
        className={`${otherclass} hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden relative`}
      >
        {/* left side */}
        <div className="h-[100%] w-[18%] sm:max-w-[14px] min-w-[10px] absolute">
          <div className="w-[100%] h-[100%]">
            <div className="ctleft w-[100%] h-[100%]"></div>
          </div>
        </div>
        {/* top side */}
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

      <div
        className={`${otherclass} hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute top-0 right-0`}
      >
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
        <div className="h-[100%] w-[14%] sm:max-w-[10px] min-w-[10px] absolute right-0">
          <div className="w-[100%] h-[100%]">
            <div className="crtop w-[100%] h-[100%]"></div>
          </div>
        </div>
      </div>

      {/* <!-- bottom right corner --> */}
      <div
        className={`${otherclass} hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute bottom-0 right-0`}
      >
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
        <div className="h-[100%] w-[14%] sm:max-w-[10px] min-w-[10px] absolute right-0">
          <div className="w-[100%] h-[100%]">
            <div className="crbottom w-[100%] h-[100%]"></div>
          </div>
        </div>
      </div>

      {/* <!-- bottom left corner --> */}
      <div
        className={` ${otherclass} hide h-[8%] max-h-[66px] max-w-[66px] sm:w-[11%]  xs:w-[8%] s:flex hidden absolute bottom-0 left-0  scale-y-[-1]`}
      >
        {/* <!-- left --> */}
        <div className="h-[100%] w-[14%] sm:max-w-[10px] min-w-[10px] absolute">
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
}

export default MyContainer;
