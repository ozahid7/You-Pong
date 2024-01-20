"use client";
import React, { useState, Fragment, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { Background } from "../../../../../components";
import { Channel, QueryProp } from "@/types";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import groups from "../../../../../public/groups.svg";
import { PasswordModal, SimpleJoinButton } from ".";
import MiniLoader from "@/components/tools/MiniLoader";

interface Props {
  refetch: any;
  channels: QueryProp;
}

export default function JoinModal({ refetch, channels }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const close = () => {
    onClose();
  };

  if (!channels?.data && channels?.isLoading) {
    return <MiniLoader />;
  }

  return (
    <Fragment>
      <Link
        role="button"
        onPress={onOpen}
        className="text-palette-clear font-archivo text-[20px] font-[700] hover:text-palette-orange underline"
      >
        Join
      </Link>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={close}
        size="4xl"
        backdrop="blur"
        placement="center"
        isDismissable={false}
      >
        <ModalContent className="">
          {(close) => (
            <Background>
              <ModalHeader
                className="flex justify-center text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[20px] sm_:text-[40px] font-[700] leading-normal not-italic"
                style={{
                  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Join a channel
              </ModalHeader>
              <ModalBody className="w-[95%] max-h-[600px] overflow-auto scrollbar-hide rounded-md">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                    <table className="table table-xs md:table-lg">
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
                          {channels.data ? (
                            channels.data
                              .filter(
                                (obj: any) =>
                                  obj.type !== "DIRECT" &&
                                  obj.type !== "PRIVATE"
                              )
                              .map((obj: any, i) => (
                                <tr key={i}>
                                  <td>
                                    <div className="w-[60px] avatar ">
                                      <Image
                                        src={obj.avatar || groups}
                                        width={60}
                                        height={60}
                                        className="border-[2px] border-palette-green p-[0.5] hidden sm_:block md:w-[60px] md:h-[60px]"
                                        alt="image"
                                      />
                                    </div>
                                  </td>
                                  <td className="font-body font-[600] text-[10px] xs:text-[18px] max-w-[150px] text-[#424242] border-palette-green whitespace-nowrap overflow-hidden text-ellipsis">
                                    {obj.name}
                                  </td>
                                  <td className="font-body font-[500] text-[#424242]">
                                    <div className="font-body font-[500] text-[18px] text-[#424242] w-fit">
                                      {obj.type === "PUBLIC" ? (
                                        <div className="flex flex-row gap-1 w-fit p-2 text-palette-white bg-palette-green font-[600] rounded-lg border-[2px] border-palette-white">
                                          <div className="xs:text-[20px] text-[14px]">
                                            <IoLockOpenOutline />
                                          </div>
                                          <div className="hidden xs:block">
                                            {obj.type}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-row gap-1 w-fit p-2 text-palette-white bg-palette-orange font-[600] rounded-lg border-[2px] border-palette-white">
                                          <div className="xs:text-[20px] text-[14px]">
                                            <IoLockClosedOutline />
                                          </div>
                                          <div className="hidden xs:block">
                                            {obj.type}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    {obj.type === "PROTECTED" ? (
                                      <PasswordModal
                                        obj={obj}
                                        close={onClose}
                                        refetch={refetch}
                                        joinRefetch={channels.fetcher}
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
                              ))
                          ) : (
                            <tr>
                              <td
                                colSpan={100}
                                className="text-center font-body text-[20px] font-[600]"
                              >
                                No channels available
                              </td>
                            </tr>
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
