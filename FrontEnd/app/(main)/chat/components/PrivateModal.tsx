"use client";
import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import { LuPlus, LuUserPlus2, LuUsers } from "react-icons/lu";
import Image from "next/image";
import { Background } from "../../../../components";
import { Channel, Member, Room_Chat, User, User_Hero } from "@/types";
import groups from "../../../../public/groups.svg";
import { JoinDropDown } from ".";
import { fetchData_Channel, fetchData_users } from "../data/api";
import { useQuery } from "react-query";

interface Props {
  MainUser: User_Hero | undefined;
  Channel_: Channel | null;
  membersRefetch: any;
  channelsRefetch: any;
  mainChannelRefetch: any;
}

const PrivateModal = ({
  MainUser,
  Channel_,
  membersRefetch,
  channelsRefetch,
  mainChannelRefetch,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  var show: boolean = false;
  var Infos = {
    disabled: "",
    status: "offline",
    selection: "",
    show: true,
    join: true,
  };

  const { data: Users, refetch: UsersRefetch } = useQuery<User[], Error>(
    ["users"],
    fetchData_users,
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  Channel_.type === "PRIVATE" ? (show = true) : (show = false);

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        className="rounded-none btn green_button"
        isDisabled={!show}
      >
        <div className="flex flex-row gap-2 w-fit h-fit">
          <IconContext.Provider
            value={{
              size: "25px",
              className: "text-palette-white border-none",
            }}
          >
            <LuUserPlus2 />
          </IconContext.Provider>
          <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
            Invite
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
                      {Users.map((user: User) => {
                        if (user.id_user === MainUser?.uid) {
                          Infos.disabled = "btn-disabled";
                        } else Infos.disabled = "";
                        user.id_user === MainUser?.uid
                          ? (Infos.selection =
                              "ring ring-palette-orange ring-offset-base-100 ring-offset-2")
                          : (Infos.selection = "");
                        user.status === "ONLINE"
                          ? (Infos.status = "online")
                          : (Infos.status = "offline");
                        return (
                          <tr key={user.username}>
                            <th>
                              <div className={`avatar ${Infos.status}`}>
                                <div className={`w-[50px] ${Infos.selection}`}>
                                  <Image
                                    src={user.avatar || groups}
                                    width={50}
                                    height={50}
                                    className="border-[2px] border-palette-green p-[0.5]"
                                    alt="image"
                                  />
                                </div>
                              </div>
                            </th>
                            <td className="font-body font-[600] text-[18px] text-[#424242] border-palette-green">
                              {user.username}
                            </td>
                            <td className="font-body font-[500] text-[18px] text-[#424242]">
                              {Infos.disabled === "btn-disabled" ? (
                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-orange font-[600] rounded-lg border-[2px] border-palette-white">
                                  MAIN
                                </div>
                              ) : (
                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-green font-[600] rounded-lg border-[2px] border-palette-white">
                                  USER
                                </div>
                              )}
                            </td>
                            <td className="flex flex-row h-full justify-center items-center">
                              {Infos.join ? (
                                <Button
                                  size="lg"
                                  className={`flex btn ${Infos.disabled} xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
                                  onPress={onOpen}
                                >
                                  Invite
                                  <LuPlus />
                                </Button>
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

export default PrivateModal;
