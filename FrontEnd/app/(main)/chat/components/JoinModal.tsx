"use client";
import React, { useState, Fragment, useRef } from "react";
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
import { Background } from "../../../../components";
import { Channel } from "@/types";
import {
  getChannels,
  joinChannel,
  userChannels,
} from "@/app/(main)/chat/data/api";
import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoEnterOutline,
} from "react-icons/io5";
import useSWR, { mutate } from "swr";
import groups from "../../../../public/groups.svg";
import { InputGroupPass } from ".";
import { fetchData_userChannels } from "../page";
import { KeyedMutator, ScopedMutator } from "swr/_internal";

export const fetchData_getChannels = async () => {
  try {
    const result = await getChannels();

    return result.object;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default function JoinModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const close = () => {
    onClose();
  };

  const {
    data: channels,
    error,
    isLoading,
  } = useSWR<Channel[]>("/myChannels", fetchData_getChannels);

  if (error) return <div>ERROR</div>;

  if (!channels && isLoading)
    return (
      <div className="flex text-[100px] h-full items-center loading text-palette-orange loading-lg"></div>
    );

  const showModal = (obj: Channel) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const passRef = useRef<HTMLInputElement>(null);
    var open: () => void = () => {};

    const close = () => {
      onClose();
    };

    const OpenModal = async () => {
      if (obj.type === "PROTECTED") open = onOpen;
      else if (obj.type === "PUBLIC") {
        joinChannel(obj.id_channel || "", null || "");
        mutate(fetchData_userChannels);
        close();
      }
    };

    const join = () => {
      if (obj.type === "PROTECTED") {
        console.log(passRef.current?.value);
        joinChannel(obj.id_channel || "", passRef.current?.value || "");
      }
      mutate(fetchData_userChannels);
      close();
    };

    return (
      <>
        <Button
          size="lg"
          className={`flex mt-1 text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md font-body font-[600] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
          onClick={OpenModal}
          onPress={open}
        >
          <IoEnterOutline />
          Join
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(close) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Set password
                </ModalHeader>
                <ModalBody>
                  <InputGroupPass
                    ref={passRef}
                    text="Password"
                    type="password"
                    customclass="w-full h-[3rem] self-center"
                    isPassword={true}
                  ></InputGroupPass>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={join}>
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
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
        scrollBehavior="inside"
        backdrop="blur"
        placement="center"
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
              <ModalBody className="w-[95%] max-h-[600px] overflow-auto scrollbar-hide rounded-md">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                    <table className="table table-lg">
                      <thead>
                        <tr className="text-[20px] font-body shadow-sm">
                          <th></th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {channels ? (
                            channels
                              .filter(
                                (obj: any) =>
                                  obj.type !== "DIRECT" &&
                                  obj.type !== "PRIVATE"
                              )
                              .map((obj: any, i) => (
                                <tr key={i}>
                                  <td>
                                    <Image
                                      src={obj.avatar || groups}
                                      width={60}
                                      height={60}
                                      className="border-[2px] border-palette-green p-[0.5]"
                                      alt="image"
                                    />
                                  </td>
                                  <td className="font-body font-[500] text-[18px] text-[#424242]">
                                    {obj.name}
                                  </td>
                                  <td className="font-body font-[500] text-[16px] text-[#424242]">
                                    <div className="flex flex-row gap-1 items-center w-fit p-1">
                                      {obj.type === "PUBLIC" ? (
                                        <IoLockOpenOutline />
                                      ) : (
                                        <IoLockClosedOutline />
                                      )}
                                      {obj.type}
                                    </div>
                                  </td>
                                  <td className="flex flex-row">
                                    {showModal(obj)}
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <div>NO CHANNELS</div>
                          )}
                        </>
                      </tbody>
                    </table>
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

{
  /* <Table aria-label="Example empty table">
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
<TableBody
  emptyContent={"No channels to display."}
  className=""
>
  <>
    {channels
      ? channels
          .filter(
            (obj: any) =>
              obj.type !== "DIRECT" &&
              obj.type !== "PRIVATE"
          )
          .map((obj: any, i) => (
            <TableRow key={i}>
              <TableCell>
                <Image
                  src={obj.avatar || groups}
                  width={60}
                  height={60}
                  className="border-[2px] border-palette-green p-[0.5]"
                  alt="image"
                />
              </TableCell>
              <TableCell className="font-body font-[500] text-[18px] text-[#424242]">
                {obj.name}
              </TableCell>
              <TableCell className="font-body font-[500] text-[16px] text-[#424242]">
                <div className="flex flex-row gap-1 items-center w-fit p-1">
                  {obj.type === "PUBLIC" ? (
                    <IoLockOpenOutline />
                  ) : (
                    <IoLockClosedOutline />
                  )}
                  {obj.type}
                </div>
              </TableCell>
              <TableCell className="flex flex-row">
                {showModal(obj)}
              </TableCell>
            </TableRow>
          ))
      : <div>NO CHANNELS</div>}
  </>
</TableBody>
</Table> */
}
