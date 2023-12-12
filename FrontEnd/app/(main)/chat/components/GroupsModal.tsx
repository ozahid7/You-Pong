"use client";
import { useState, useRef, Fragment } from "react";
import { Background, Submit } from "@/components";
import { Channel } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Tabs,
    Tab,
    Card,
    CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import groups from "../../../../public/groups.svg";
import { setData, setFile } from "@/app/(main)/chat/data/api";
import { mutate } from "swr";
import { GroupsInput } from ".";

export var setDataObj: Channel = {
    type: "PUBLIC",
    name: "Channel",
    description: "Change this description",
    avatar: null,
};

export default function GroupsModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [selected, setSelected] = useState<string>("PUBLIC");
    const [file, setFilee] = useState<any>(null);

  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passConfRef = useRef<HTMLInputElement>(null);
  var   object: { object: any; message: string };

    let imageUrl: any;

    if (file instanceof Blob || file instanceof File) {
        try {
            imageUrl = URL.createObjectURL(file);
        } catch (error) {
            console.error("Error creating object URL:", error);
            // Handle the error gracefully or provide a fallback URL
            imageUrl = groups;
        }
    } else {
        // Fallback to groups or any other default image source if file is not a Blob or File
        imageUrl = groups;
    }
    const CreateGroupDATA = async () => {
        var result = null;

        setDataObj.name = nameRef.current.value;
        if (nameRef.current.value) {
            if (descRef.current.value)
                setDataObj.description = descRef.current.value;
            if (setDataObj.type == "PROTECTED") {
                if (
                    passRef.current.value &&
                    passConfRef.current.value === passRef.current.value
                )
                    setDataObj.hash = passRef.current.value;
                else setDataObj.hash = null;
            }
            if (
                (setDataObj.type == "PROTECTED" && setDataObj.hash) ||
                setDataObj.type != "PROTECTED"
            ) {
                if (imgRef.current.value !== "") {
                    result = await setFile(imgRef.current.files[0]);
                } else result = await setFile(null);

                setDataObj.avatar = result;

                onClose();
                // CLOSE THE MODAL Function :)
                object = await setData(setDataObj);
                // SEND DATA TO HAMID RIGHT HERE
                if (object.object !== null)
                    mutate(
                        "/myData",
                        (cachedData) => [...cachedData, setDataObj],
                        true
                    );
            }
            clean();
        }
    };

    const handleSelectionChange = (newSelection: string) => {
        setSelected(newSelection);
        setDataObj.type = newSelection;
    };

    const clean = () => {
        setFilee(groups);
        setDataObj.description = "Change this description";
        setDataObj.avatar = null;
        // if (descRef.current.value !== null)
        //   descRef.current.value = null;
        // nameRef.current.value = null;
        // imgRef.current.value = null;
        // if (setDataObj.type == "PROTECTED") {
        //   passRef.current.value = null;
        //   passConfRef.current.value = null;
        // }
    };
    const close = () => {
        onClose();
        clean();
    };

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        size="lg"
        className="flex max-w-[90px] btn xs:btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-palette-green font-body font-[600] text-[#EFF5F5] hover:text-palette-white hover:bg-palette-white rounded-md green_button border-none hover:border-none"
      >
        Create
        {/* <LuPlusSquare /> */}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={close}
        size="4xl"
        className=" w-full"
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
                Create a group
              </ModalHeader>
              <ModalBody className="w-[60%]">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <Image
                    src={imageUrl}
                    alt="groups"
                    width={30}
                    height={30}
                    className="w-[9rem] aspect-square"
                  />
                  <div className="flex p-3 border-b-white border-b-[2px] w-full justify-center items-center">
                    <label
                      htmlFor="files"
                      className="btn font-body bg-palette-green text-white hover:bg-palette-orange"
                    >
                      Choose a picture
                    </label>
                    <input
                      ref={imgRef}
                      id="files"
                      className="hidden"
                      type="file"
                      onChange={(event) => {
                        setFilee(event.target.files?.[0] as File);
                      }}
                    />
                  </div>
                  <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                    <Tabs
                      selectedKey={selected}
                      onSelectionChange={(newSelection) =>
                        handleSelectionChange(newSelection.toString())
                      }
                      aria-label="Options"
                      size="lg"
                      radius="sm"
                      className=" w-full h-fit flex justify-center"
                    >
                      <Tab
                        key="PUBLIC"
                        title="PUBLIC"
                        className="w-full font-body"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <GroupsInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PRIVATE"
                        title="PRIVATE"
                        className="w-full font-body"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <GroupsInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PROTECTED"
                        title="PROTECTED"
                        className="w-full font-body text-red-500"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6 bg">
                            <GroupsInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={passRef}
                              text="Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                            ></GroupsInput>
                            <GroupsInput
                              ref={passConfRef}
                              text="Confirm Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
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
                    text="CREATE"
                    handleclick={CreateGroupDATA}
                  ></Submit>
                </div>
              </ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
