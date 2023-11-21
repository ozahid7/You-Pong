"use client";
import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Image from "next/image";
import groups from "../../../../public/groups.svg";
import {
  MyInput,
  Background,
  Submit,
  MyContainer,
} from "../../../../components";
import { Channel } from "@/types";
import { setData, setFile } from "@/app/dashboard/chat/data/api";
import { LuLogIn, LuLock, LuUnlock } from "react-icons/lu";

export var setDataObj: Channel = {
  type: "PUBLIC",
  name: "Channel",
  description: "Change this description",
  avatar: null,
};

export default function JoinModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>("PUBLIC");

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };

  const close = () => {
    onClose();
  };

  return (
    <Fragment>
      <Button
        size="sm"
        onPress={onOpen}
        className="flex max-w-[90px] btn xs:btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-palette-green font-body font-[600] text-[#EFF5F5] hover:text-palette-white hover:bg-palette-white rounded-md  orange_button border-none hover:border-none"
      >
        Join
        {/* <LuPlusSquare /> */}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={close}
        size="2xl"
        className=" w-full"
      >
        <ModalContent className="">
          {(close) => (
              <Background>
                <ModalHeader
                  className="flex justify-center text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[40px] font-[700] leading-normal not-italic"
                  style={{
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  Join a group
                </ModalHeader>
                <ModalBody className="w-[95%]">
                  <div className="flex justify-evenly items-center flex-col gap-3">
                    <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                      <div className="overflow-x-auto">
                        <table className="table border-white">
                          {/*<!-- head -->*/}
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Job</th>
                              <th>Favorite Color</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/*<!-- row 1 -->*/}
                            <tr>
                              <th>1</th>
                              <td>Cy Ganderton</td>
                              <td>Quality Control Specialist</td>
                              <td>Blue</td>
                            </tr>
                            {/*<!-- row 2 -->*/}
                            <tr>
                              <th>2</th>
                              <td>Hart Hagerty</td>
                              <td>Desktop Support Technician</td>
                              <td>Purple</td>
                            </tr>
                            {/*<!-- row 3 -->*/}
                            <tr>
                              <th>3</th>
                              <td>Brice Swyre</td>
                              <td>Tax Accountant</td>
                              <td>Red</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex w-[300px] h-[70px]">
                    <Submit
                      color="orange"
                      text="JOIN"
                      // handleclick={}
                    ></Submit>
                  </div>
                </ModalFooter>
              </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
