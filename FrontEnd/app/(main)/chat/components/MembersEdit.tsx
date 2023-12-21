"use client";
import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  LuUser,
} from "react-icons/lu";
import Image from "next/image";
import { Background } from "../../../../components";
import { Channel, Member, Room_Chat, User, User_Hero } from "@/types";
import groups from "../../../../public/groups.svg";
import useSWR from "swr";
import { JoinDropDown } from ".";

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
    show: true,
    join: true,
  };

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
        size="3xl"
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
                          user.user_role === "MEMBER"
                            ? (Infos.join = false)
                            : (Infos.join = true);
                          user.user_role === "ADMIN"
                            ? (Infos.show = false)
                            : (Infos.show = true);
                        } else Infos.disabled = "";
                        user.user.id_user === MainUser?.uid
                          ? (Infos.selection =
                              "ring ring-palette-orange ring-offset-base-100 ring-offset-2")
                          : (Infos.selection = "");
                        user.user.status === "ONLINE"
                          ? (Infos.status = "online")
                          : (Infos.status = "offline");
                        user.user_role === "OWNER" && Infos.show === false
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
                                <JoinDropDown
                                  disable={Infos.disabled}
                                  user={user}
                                  key={user.user.id_user}
                                  channel={Channel_}
                                ></JoinDropDown>
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
