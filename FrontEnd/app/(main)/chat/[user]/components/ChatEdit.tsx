"use client";
import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
  Card,
  CardBody,
  useDisclosure,
  Button,
  Link,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import { LuSettings, LuUser } from "react-icons/lu";
import groups from "../../../../../public/groups.svg";
import Image from "next/image";
import { GroupsInput } from ".";
import { Background, Submit } from "@/components";
import { Channel, Member, User_Hero } from "@/types";
import { putData, setData, setFile, getChannel } from "../data/api";

export const getRandomNumber = () => {
  const min = 20;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface HomePage {
  channels: Channel;
  users: Member[];
  MainUser: User_Hero;
  channelsRefetch: any;
}

type TabSize = "sm" | "md" | "lg";

const ChatEdit = ({ channels, users, channelsRefetch, MainUser }: HomePage) => {
  var setDataObj: Channel = {
    type: channels.type,
    name: channels.name,
    description: "",
    avatar: channels.avatar,
    hash: channels.hash,
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confpassRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>(channels.type);
  const [valid, setValid] = useState<boolean>(false);
  const [file, setFilee] = useState<any>(null);

  let imageUrl: any;
  var result: any = undefined;
  var disabled: boolean = false;

  if (users && MainUser)
    users.map((member) => {
      member.user.id_user === MainUser.uid
        ? member.user_role === "OWNER"
          ? (disabled = false)
          : (disabled = true)
        : "";
    });

  if (file instanceof Blob || file instanceof File) {
    try {
      imageUrl = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error creating object URL:", error);
      // Handle the error gracefully or provide a fallback URL
      imageUrl = channels.avatar;
    }
  } else {
    // Fallback to channels.avatar or any other default image source if file is not a Blob or File
    imageUrl = channels.avatar;
  }

  const SendDataToLeader = async () => {
    setValid(false);

    /// update avatar ///
    if (imgRef.current?.value !== "") {
      if (imgRef.current?.files)
        result = await setFile(imgRef.current.files[0]);
      if (result) setDataObj.avatar = result;
      else setDataObj.avatar = channels.avatar;
    }
    //////////////////////

    /// update name ///
    if (nameRef.current?.value) setDataObj.name = nameRef.current?.value;
    else setDataObj.name = channels.name;
    //////////////////////

    /// update description ///
    if (descRef.current?.value) setDataObj.description = descRef.current?.value;
    else setDataObj.description = channels.description;
    //////////////////////

    /// update type ///
    if (selected) setDataObj.type = selected;
    //////////////////////

    /// update password ///
    if (selected === "PROTECTED") {
      if (!passRef.current.value || !confpassRef.current.value) {
        passRef.current.value = null;
        confpassRef.current.value = null;
        return;
      } else if (passRef.current.value && confpassRef.current.value) {
        if (passRef.current.value === confpassRef.current.value)
          setDataObj.hash = passRef.current.value;
        else {
          setValid(true);
          passRef.current.value = null;
          confpassRef.current.value = null;
          return;
        }
      }
    }
    //////////////////////
    console.log(setDataObj);

    result = await putData(setDataObj, channels?.id_channel);
    if (result?.message === "Channel Updated Succefully") {
      console.log(result.message);
      channelsRefetch();
      onClose();
    } else {
      console.error(result?.message);
      return;
    }
  };

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };

  const printOnline = () => {
    var m: number = 0;

    if (users)
      users?.map((obj) => {
        obj.user.status === "ONLINE" ? (m += 1) : (m += 0);
      });

    return m;
  };

  const [tabSize, setTabSize] = useState<TabSize>("lg");

  useEffect(() => {
    // Function to update the modal size
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Tailwind's 'sm' breakpoint
        setTabSize("sm");
      } else if (width < 768) {
        setTabSize("md");
      } else if (width < 1024) {
        setTabSize("lg");
      } else {
        setTabSize("lg");
      }
    };

    // Update modal size on mount and when window resizes
    updateSize();
    window.addEventListener("resize", updateSize);

    // Cleanup listener
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Fragment>
      <div
        role="button"
        onClick={!disabled ? onOpen : undefined}
        className={` ${disabled ? "line-through" : ""
          } py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white`}
      >
        <LuSettings />
        <div className="w-fit h-fit">Edit</div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size={"4xl"}
        className=" w-full"
        backdrop="blur"
        placement="center"
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
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
                Edit a channel
              </ModalHeader>
              <ModalBody className="w-[60%]">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <Image
                    src={imageUrl || groups}
                    alt="groups"
                    width={100}
                    height={100}
                    className="w-[9rem] aspect-square"
                  />
                  <div className="flex p-3 border-b-white border-b-[2px] w-full justify-center items-center flex-col gap-2">
                    <label
                      htmlFor="files"
                      className="btn font-body bg-palette-green text-white hover:bg-palette-orange"
                    >
                      Choose a picture
                    </label>
                    <input
                      accept="image/png, image/jpeg, image/gif, image/bmp, image/svg+xml, image/webp"
                      ref={imgRef}
                      id="files"
                      className="hidden"
                      type="file"
                      onChange={(event) => {
                        setFilee(event.target.files?.[0] as File);
                      }}
                    />
                    <div className="flex flex-col">
                      <div className="font-body text-[30px] max-w-[600px] font-[700] flex self-center whitespace-nowrap overflow-hidden text-wrap">
                        {channels.name}
                      </div>
                      <div className="flex flex-row gap-2 justify-center w-full ">
                        <div className="flex font-archivo text-[#686868]">
                          Members: {users.length}
                        </div>
                        <div className="flex font-archivo text-[#00993D]">
                          Online: {printOnline()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                    <Tabs
                      selectedKey={selected}
                      onSelectionChange={(newSelection) =>
                        handleSelectionChange(newSelection.toString())
                      }
                      aria-label="Options"
                      size={tabSize}
                      radius="sm"
                      className=" w-full h-fit flex justify-center"
                    >
                      <Tab
                        key="PUBLIC"
                        title="PUBLIC"
                        className="w-full font-body font-[600]"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <GroupsInput
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text={channels.description}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PRIVATE"
                        title="PRIVATE"
                        className="w-full font-body font-[600]"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <GroupsInput
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text={channels.description}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PROTECTED"
                        title="PROTECTED"
                        className="w-full font-body font-[600]"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6 bg">
                            <GroupsInput
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text={channels.description}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={passRef}
                              text="New Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                              isPassword={true}
                              isValid={valid}
                            ></GroupsInput>
                            <GroupsInput
                              ref={confpassRef}
                              text="Confirm Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                              isPassword={true}
                              isValid={valid}
                            ></GroupsInput>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-[300px] h-[70px]">
                  <Submit
                    color="green"
                    text="UPDATE"
                    handleclick={SendDataToLeader}
                  ></Submit>
                </div>
              </ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ChatEdit;
