import React from "react";
import { MyContainer, CustomButton } from "@/components";
import * as Matter from "matter-js";

export default function game() {
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%] debug ">
        <MyContainer>
          <div></div>
        </MyContainer>
      </div>
    </div>
  );
}
