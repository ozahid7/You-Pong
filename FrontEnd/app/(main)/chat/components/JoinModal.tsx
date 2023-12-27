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
import { Channel, QueryProp } from "@/types";
import {
  fetchData_getChannels,
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
import { InputGroupPass, PasswordModal, SimpleJoinButton } from ".";
import { useQuery } from "react-query";

interface Props {
  refetch: any;
  channels: QueryProp;
}
export default function JoinModal({ refetch, channels }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const close = () => {
    onClose();
  };

  if (!channels?.data && channels?.isLoading)
    return (
      <div className="flex text-[100px] h-full items-center loading text-palette-orange loading-lg"></div>
    );

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
                          {channels.data &&
                            channels.data
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
                                    {obj.type === "PROTECTED" ? (
                                      <PasswordModal
                                        obj={obj}
                                        close={onClose}
                                        refetch={refetch}
                                        key="protected"
                                      />
                                    ) : (
                                      <SimpleJoinButton
                                        obj={obj}
                                        refetch={refetch}
                                        joinRefetch={channels.fetcher}
                                        close={onClose}
                                        key="public"
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
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
