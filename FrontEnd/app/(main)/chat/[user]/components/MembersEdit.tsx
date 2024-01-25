"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { LuUsers } from "react-icons/lu";
import Image from "next/image";
import { Background } from "../../../../../components";
import { Channel, Member, User_Hero } from "@/types";
import groups from "../../../../../public/groups.svg";
import { JoinDropDown } from ".";
import { useRouter } from "next/navigation";

interface Props {
  Users: Member[];
  MainUser: User_Hero | undefined;
  Channel_: Channel | null;
  membersRefetch: any;
  channelsRefetch: any;
  mainChannelRefetch: any;
}

var Infos = {
  disabled: "",
  role: "",
  status: "offline",
  selection: "",
  show: true,
  join: true,
};

const MembersEdit = ({
  Users,
  MainUser,
  Channel_,
  membersRefetch,
  channelsRefetch,
  mainChannelRefetch,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [clicked, setClicked] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {

    if (clicked !== null) {
      router.push(`/user/${clicked}`);
    };

  }, [clicked]);

  return (
    <Fragment>
      <div
        role="button"
        onClick={onOpen}
        className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
      >
        <LuUsers />
        <div className="h-fit w-fit">
          Members
        </div>
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
                Members
              </ModalHeader>
              <ModalBody className="w-[90%]">
                <table className="table table-sm md:table-lg">
                  <thead>
                    <tr className="text-[20px] font-nunito text-black shadow-sm">
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
                        user.user_role !== "MEMBER" && Infos.show === false
                          ? (Infos.disabled = "btn-disabled")
                          : "";
                        return (
                          <tr key={user.user.id_user}>
                            <th className="">
                              <div className={`avatar md:block xxs:hidden`}>
                                <div className={`w-[60px] ${Infos.selection} cursor-pointer`}>
                                  <Image
                                    src={user.user.avatar || groups}
                                    width={60}
                                    height={60}
                                    className="border-[2px] border-palette-green p-[0.5]"
                                    onClick={
                                      () => setClicked(user.user.username)
                                    }
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
                                  Owner
                                </div>
                              ) : user.user_role == "MEMBER" ? (
                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-green font-[600] rounded-lg border-[2px] border-palette-white">
                                  Member
                                </div>
                              ) : (
                                <div className="flex flex-row w-fit p-2 text-palette-orange bg-palette-white font-[600] rounded-lg border-[2px] border-palette-white">
                                  Admin
                                </div>
                              )}
                            </td>
                            <td>
                              {Infos.join ? (
                                <JoinDropDown
                                  disable={Infos.disabled}
                                  mainChannelRefetch={mainChannelRefetch}
                                  user={user}
                                  key={user.user.id_user}
                                  channel={Channel_}
                                  membersRefetch={membersRefetch}
                                  channelsRefetch={channelsRefetch}
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
