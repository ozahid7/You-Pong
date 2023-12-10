"use client";
import React, { useState, useRef, Fragment, useEffect } from "react";
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
    LuSettings,
    LuUser,
    LuUsers,
    LuArrowDown,
    LuStar,
    LuBan,
    LuBellOff,
    LuDoorOpen,
} from "react-icons/lu";
import groups from "../../../../public/groups.svg";
import Image from "next/image";
import {
    MyInput,
    Background,
    Submit,
    MyContainer,
} from "../../../../components";
import { Channel } from "@/types";
import { getChannels, setData, setFile } from "@/app/(main)/chat/data/api";
import { setDataObj } from "./GroupsModal";
import { color } from "framer-motion";
import { MyButton } from ".";
import useSWR from "swr";

const MembersEdit = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const fetchData = async () => {
        try {
            const result = await getChannels();
            console.log(result);

            return result.object;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const {
        data: objects,
        error,
        isLoading,
    } = useSWR<Channel[]>("/myChannels", fetchData);

    if (error) return <div>ERROR</div>;

    if (!objects && isLoading)
        return (
            <div className="flex text-[100px] h-full items-center loading text-palette-orange loading-lg">
                LOADING
            </div>
        );

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
                                    textShadow:
                                        "0px 2px 2px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                Members
                                <div></div>
                            </ModalHeader>
                            <ModalBody className="w-[90%]">
                                <Table
                                    aria-label="Example empty table"
                                    hideHeader
                                >
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
                                            ACTIONS
                                        </TableColumn>
                                    </TableHeader>
                                    <TableBody
                                        emptyContent={"No channels to display."}
                                    >
                                        <TableRow className="flex items-center justify-evenly border-palette-green rounded-lg border-b-[1px] border-t-[1px]">
                                            <TableCell>
                                                <Image
                                                    src={groups}
                                                    width={50}
                                                    height={50}
                                                    className="border-[2px] border-palette-green p-[0.5]"
                                                    alt="image"
                                                />
                                            </TableCell>
                                            <TableCell className="font-body font-[500] text-[18px] text-[#424242] border-palette-green">
                                                asmaa
                                            </TableCell>
                                            <TableCell className="font-body font-[500] text-[18px] text-[#424242]">
                                                <div className="flex flex-row w-fit p-2 text-palette-white bg-palette-orange font-[600] rounded-lg border-[2px] border-palette-white">
                                                    owner
                                                </div>
                                            </TableCell>
                                            <TableCell className="flex flex-row h-full justify-center items-center">
                                                <Dropdown className="bg-palette-white self-center">
                                                    <DropdownTrigger className="w-fit">
                                                        <Button
                                                            size="lg"
                                                            className="flex btn xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green"
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
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                      <TableCell>
                        <Image
                          src={groups}
                          width={50}
                          height={50}
                          className="border-[2px] border-palette-green p-[0.5]"
                          alt="image"
                        />
                      </TableCell>
                      <TableCell className="font-body font-[500] text-[18px] text-[#424242] overflow-x-hidden">
                        User2
                      </TableCell>
                      <TableCell className="font-body font-[500] text-[17px] text-[#424242]">
                        <div className="flex flex-row gap-1 items-center w-fit p-1 text-palette-green font-[600]">
                          Member
                        </div>
                      </TableCell>
                      <TableCell className="flex flex-row h-full w-[135px]">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              size="lg"
                              className="flex btn xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green"
                            >
                              Action
                              <LuArrowDown />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem>Set as admin</DropdownItem>
                            <DropdownItem>Mute</DropdownItem>
                            <DropdownItem>Kick</DropdownItem>
                            <DropdownItem>Ban</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow> */}
                                        {/* <TableRow>
                      <TableCell>
                        <Image
                          src={groups}
                          width={50}
                          height={50}
                          className="border-[2px] border-palette-green p-[0.5]"
                          alt="image"
                        />
                      </TableCell>
                      <TableCell className="font-body font-[500] text-[18px] text-[#424242] overflow-x-hidden">
                        User2
                      </TableCell>
                      <TableCell className="font-body font-[500] text-[17px] text-[#424242]">
                        <div className="flex flex-row gap-1 items-center w-fit p-1 text-palette-green font-[600]">
                          Member
                        </div>
                      </TableCell>
                      <TableCell className="flex flex-row h-full w-[135px]">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              size="lg"
                              className="flex btn xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green"
                            >
                              Action
                              <LuArrowDown />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem>Set as admin</DropdownItem>
                            <DropdownItem>Mute</DropdownItem>
                            <DropdownItem>Kick</DropdownItem>
                            <DropdownItem>Ban</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow> */}
                                    </TableBody>
                                </Table>
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
