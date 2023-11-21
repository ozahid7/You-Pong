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
import { MyInput, Background, Submit } from "../../../../components";
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
                    <Table aria-label="Example empty table">
                      <TableHeader>
                        <TableColumn className="font-['Chakra_Petch'] font-[600] text-shadow-md">
                          NAME
                        </TableColumn>
                        <TableColumn className="font-['Chakra_Petch'] font-[600] text-shadow-md">
                          TYPE
                        </TableColumn>
                        <TableColumn className="font-['Chakra_Petch'] font-[600] text-shadow-md">
                          ACTION
                        </TableColumn>
                      </TableHeader>
                      <TableBody emptyContent={"No channels to display."}>
                        <TableRow>
                          <TableCell className="text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[18px] font-[700] leading-normal not-italic">
                            Channel1
                          </TableCell>
                          <TableCell className="font-archivo text-[18px] text-palette-orange">
                            <div className="flex flex-row gap-2 items-center">
                              PROTECTED
                              <LuLock />
                            </div>
                          </TableCell>
                          <TableCell className="flex flex-row">
                            <Button
                              size="md"
                              className="flex text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md font-body font-[600] text-[#EFF5F5] green_button rounded-md border-none hover:border-none"
                            >
                              <LuLogIn />
                              Join
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[18px] font-[700] leading-normal not-italic">
                            Channel1
                          </TableCell>
                          <TableCell className="font-archivo text-[18px] text-palette-orange">
                            <div className="flex flex-row gap-2 items-center">
                              PUBLIC
                              <LuUnlock />
                            </div>
                          </TableCell>
                          <TableCell className="flex flex-row h-full">
                            <Button
                              size="md"
                              className="flex text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md  font-body font-[600] text-[#EFF5F5] rounded-md green_button border-none hover:border-none"
                            >
                              <LuLogIn />
                              Join
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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
