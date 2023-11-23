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
import ozahid from "../../../../public/ozahid-.jpeg";
import { MyInput, Background, Submit } from "../../../../components";
import { Channel } from "@/types";
import { setData, setFile } from "@/app/dashboard/chat/data/api";
import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoEnterOutline,
} from "react-icons/io5";

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
                        <TableColumn className="font-body font-[700] text-shadow-md text-[16px]">
                          AVATAR
                        </TableColumn>
                        <TableColumn className="font-body font-[700] text-shadow-md text-[16px]">
                          NAME
                        </TableColumn>
                        <TableColumn className="font-body font-[700] text-shadow-md text-[16px]">
                          TYPE
                        </TableColumn>
                        <TableColumn className="font-body font-[700] text-shadow-md text-[16px]">
                          ACTION
                        </TableColumn>
                      </TableHeader>
                      <TableBody emptyContent={"No channels to display."}>
                        <TableRow>
                          <TableCell>
                            <Image
                              src={groups}
                              width={50}
                              height={50}
                              className="border-[2px] border-palette-green p-[0.5]"
                              alt="image"
                            />
                          </TableCell>
                          <TableCell className="font-body font-[500] text-[18px] text-[#424242]">
                            Channel
                          </TableCell>
                          <TableCell className="font-body font-[500] text-[16px] text-[#424242]">
                            <div className="flex flex-row gap-1 items-center w-fit p-1">
                              <IoLockClosedOutline />
                              PROTECTED
                            </div>
                          </TableCell>
                          <TableCell className="flex flex-row">
                            <Button
                              size="lg"
                              className="flex text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md font-body font-[600] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green"
                            >
                              <IoEnterOutline />
                              Join
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Image
                              src={ozahid}
                              width={50}
                              height={50}
                              className="border-[2px] border-palette-green p-[0.5]"
                              alt="image"
                            />
                          </TableCell>
                          <TableCell className="font-body font-[500] text-[18px] text-[#424242] overflow-x-hidden">
                            Channel
                          </TableCell>
                          <TableCell className="font-body font-[500] text-[16px] text-[#424242]">
                            <div className="flex flex-row gap-1 items-center w-fit p-1">
                              <IoLockOpenOutline />
                              PUBLIC
                            </div>
                          </TableCell>
                          <TableCell className="flex flex-row h-full">
                            <Button
                              size="lg"
                              className="flex text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md  font-body font-[600] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green"
                            >
                              <IoEnterOutline />
                              Join
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
