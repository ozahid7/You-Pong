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
import { LuPlus, LuUserCheck2, LuUserPlus2, LuUsers } from "react-icons/lu";
import Image from "next/image";
import { Background } from "../../../../../components";
import { Channel, Member, Room_Chat, User, User_Hero } from "@/types";
import groups from "../../../../../public/groups.svg";
import { JoinDropDown } from ".";
import { fetchData_Channel, fetchData_users, joinPrivate } from "../data/api";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";

interface Props {
  MainUser: User_Hero;
  Channel_: Channel;
  Members: Member[];
  membersRefetch: any;
  channelsRefetch: any;
  mainChannelRefetch: any;
}

const PrivateModal = ({
  MainUser,
  Channel_,
  Members,
  membersRefetch,
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

  const {
    data: Users,
    refetch: UsersRefetch,
    isLoading,
  } = useQuery<User[], Error>(
    ["users", Channel_.id_channel],
    () => fetchData_users(Channel_.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  if (isLoading) <Loader />;

  if (Members)
    Members.map((member) => {
      member.user.id_user === MainUser.uid
        ? member.user_role === "OWNER"
          ? (show = false)
          : (show = true)
        : "";
    });

  const joinPrivateChannel = async (id_friend: string) => {
    const response = await joinPrivate(Channel_.id_channel, id_friend);
    if (response.message === "Channel Updated Succefully") {
      UsersRefetch();
      membersRefetch();
    } else console.error(response.message);
  };

  const isUserInMembers = (user: User) => {
    return !!Members.find((member) => member.user.id_user === user.id_user);
  };

  return (
    <Fragment>
      <div
        onClick={show ? undefined : onOpen}
        role="button"
        className={`${show ? "line-through" : ""
          } py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white`}
      >
        <LuUserPlus2 />
        <div className="h-fit w-fit">Invite</div>
      </div>
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
                Users
              </ModalHeader>
              <ModalBody className="w-[90%]">
                <table className="table table-sm md:table-lg ">
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
                      {Users ? (
                        Users.map((user: User) => {
                          if (
                            user.id_user === MainUser?.uid ||
                            isUserInMembers(user) !== false
                          ) {
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
                                <div className={`avatar md:block xxs:hidden`}>
                                  <div
                                    className={`w-[60px] ${Infos.selection}`}
                                  >
                                    <Image
                                      src={user.avatar || groups}
                                      width={60}
                                      height={60}
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
                              <td>
                                {Infos.join ? (
                                  <Button
                                    size="lg"
                                    className={`flex btn ${Infos.disabled} xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
                                    onClick={() =>
                                      joinPrivateChannel(user.id_user)
                                    }
                                  >
                                    {Infos.disabled === "btn-disabled" ? (
                                      <div className="flex flex-row gap-1 items-center text-palette-white">
                                        Joined
                                        <LuUserCheck2 />
                                      </div>
                                    ) : (
                                      <div className="flex flex-row gap-1 items-center text-palette-white">
                                        Invite
                                        <LuPlus />
                                      </div>
                                    )}
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={100}
                            className="text-center font-body text-[20px] font-[600]"
                          >
                            No users available
                          </td>
                        </tr>
                      )}
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
