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
import { Channel, Member, Room_Chat, User, User_Hero } from "@/types";
import groups from "../../../../public/groups.svg";
import useSWR from "swr";
import { getChannel, getMainUser } from "../data/api";

interface Props {
  Users: Member[];
  MainUser: User_Hero | undefined;
  Channel_: Channel | null;
}

const MembersEdit = ({ Users, MainUser, Channel_ }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  var Infos = {
    disabled: "",
    role: "",
    status: "offline",
    selection: "",
    hidaya: true,
    join: true,
  };
  var num: any = Channel_?.rooms?.length;

  console.log("MEMBERS", Users);

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
                      {Users.map((user: Member) => {
                        Infos.role = "";
                        if (user.user.id_user === MainUser?.uid) {
                          Infos.disabled = "btn-disabled";
                          if (user.user_role === "MEMBER") Infos.join = false;
                          else Infos.join = true;
                          if (user.user_role === "ADMIN") Infos.hidaya = false;
                          else Infos.hidaya = true;
                        } else Infos.disabled = "";
                        if (user.user.id_user === MainUser?.uid)
                          Infos.selection =
                            "ring ring-palette-orange ring-offset-base-100 ring-offset-2";
                        else Infos.selection = "";
                        user.user.status === "ONLINE"
                          ? (Infos.status = "online")
                          : (Infos.status = "offline");
                        user.user_role === "OWNER" && Infos.hidaya === false
                          ? (Infos.disabled = "btn-disabled")
                          : "";
                        return (
                          <tr key={user.user.username}>
                            <th>
                              <div className={`avatar ${Infos.status}`}>
                                <div className={`w-[50px] ${Infos.selection}`}>
                                  <Image
                                    src={user.user.avatar || groups}
                                    width={50}
                                    height={50}
                                    className="border-[2px] border-palette-green p-[0.5]"
                                    alt="image"
                                  />
                                </div>
                              </div>
                            </th>
                            <td className="font-body font-[600] text-[18px] text-[#424242] border-palette-green">
                              {user.user.username}
                            </td>
                            <td className="font-body font-[500] text-[18px] text-[#424242]">
                              {user.user_role == "OWNER" ? (
                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-orange font-[600] rounded-lg border-[2px] border-palette-white">
                                  OWNER
                                </div>
                              ) : user.user_role == "MEMBER" ? (
                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-green font-[600] rounded-lg border-[2px] border-palette-white">
                                  MEMBER
                                </div>
                              ) : (
                                <div className="flex flex-row w-fit p-2 text-palette-orange bg-palette-white font-[600] rounded-lg border-[2px] border-palette-white">
                                  ADMIN
                                </div>
                              )}
                            </td>
                            <td className="flex flex-row h-full justify-center items-center">
                              {Infos.join ? (
                                <Dropdown className="bg-palette-white self-center">
                                  <DropdownTrigger className="w-fit">
                                    <Button
                                      size="lg"
                                      className={`flex btn ${Infos.disabled} xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
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
                              ) : (
                                ""
                              )}
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
