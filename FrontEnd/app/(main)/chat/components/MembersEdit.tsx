"use client";
import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableCell,
  TableColumn,
  TableBody,
  TableRow,
  TableHeader,
  useDisclosure,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Dropdown,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import {
  LuUsers,
  LuArrowDown,
  LuStar,
  LuBan,
  LuBellOff,
  LuDoorOpen,
} from "react-icons/lu";
import Image from "next/image";
import { Background } from "../../../../components";
import { Channel, User } from "@/types";
import groups from "../../../../public/groups.svg";
import useSWR from "swr";
import { getChannel, getMainUser } from "../data/api";

interface Props {
  Users: User[];
  MainUser: User | undefined;
  Channel: Channel;
}

const MembersEdit = ({ Users, MainUser, Channel }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  var disable: string = "";

  console.log(Channel.id_channel);

  return (
    <Fragment>
      <Button onPress={onOpen} className="rounded-none btn green_button">
        <div className="flex flex-row gap-2 w-fit h-fit">
          <IconContext.Provider
            value={{
              size: "25px",
              className: "text-palette-white border-none",
            }}
          >
            <LuUsers />
          </IconContext.Provider>
          <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
            Members
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="2xl"
        backdrop="blur"
        className="w-full"
      >
        <ModalContent className="">
          {(onClose) => (
            <Background>
              <ModalHeader
                className="flex justify-center text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[40px] font-[700] leading-normal not-italic"
                style={{
                  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Members
              </ModalHeader>
              <ModalBody className="w-[90%]">
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
                      {Users.map((user: User) => {
                        if (user.username === MainUser?.username)
                          disable = "btn-disabled";
                        else disable = "";
                        return (
                          <tr key={user.username}>
                            <th>
                              <Image
                                src={user.avatar || groups}
                                width={50}
                                height={50}
                                className="border-[2px] border-palette-green p-[0.5]"
                                alt="image"
                              />
                            </th>
                            <td className="font-body font-[600] text-[18px] text-[#424242] border-palette-green">
                              {user.username}
                            </td>
                            <td className="font-body font-[500] text-[18px] text-[#424242]">
                              <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-orange font-[600] rounded-lg border-[2px] border-palette-white">
                                owner
                              </div>
                            </td>
                            <td className="flex flex-row h-full justify-center items-center">
                              <Dropdown className="bg-palette-white self-center">
                                <DropdownTrigger className="w-fit">
                                  <Button
                                    size="lg"
                                    className={`flex btn ${disable} xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
                                  >
                                    Action
                                    <LuArrowDown />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  className="w-full"
                                  aria-label="DropDownMenu"
                                >
                                  <DropdownItem
                                    className="hover:bg-palette-white border-none"
                                    variant="bordered"
                                    aria-label="SetAsAdmin"
                                  >
                                    <button className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full">
                                      <LuStar />
                                      Set as admin
                                    </button>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="hover:bg-palette-white border-none"
                                    variant="bordered"
                                    aria-label="Mute"
                                  >
                                    <button className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full">
                                      <LuBellOff />
                                      Mute
                                    </button>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="hover:bg-palette-white border-none"
                                    variant="bordered"
                                    aria-label="Kick"
                                  >
                                    <button className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full">
                                      <LuDoorOpen />
                                      Kick
                                    </button>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="hover:bg-palette-white border-none"
                                    variant="bordered"
                                    aria-label="Ban"
                                  >
                                    <button className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full">
                                      <LuBan />
                                      Ban
                                    </button>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default MembersEdit;
