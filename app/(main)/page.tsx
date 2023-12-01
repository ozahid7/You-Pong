import {
  MobileSideBar,
  MyContainer,
  MyDialog,
  NavBar,
  SideBar,
} from "@/components";
import React from "react";


export default function Dashboard() {
  return (
    <div className="h-full w-full make_center">
      <div className="flex justify-center w-[90%] h-[80%]">
        <MyContainer >
          <div className=" make_center h-[100%] overflow-auto"></div>
        </MyContainer>
      </div>
    </div>
  );
}
