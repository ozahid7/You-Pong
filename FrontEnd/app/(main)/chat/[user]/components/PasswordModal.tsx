import { Channel } from "@/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { joinChannel } from "../data/api";
import { IoEnterOutline } from "react-icons/io5";
import GroupsInput from "./GroupsInput";
import { Background } from "@/components";

interface Props {
  obj: Channel;
  close: any;
  refetch: any;
}

const PasswordModal = ({ obj, close, refetch }: Props) => {
  const [valid, setValid] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const passRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValid(false);
  }, []);

  const join = async () => {
    setValid(false);
    if (passRef.current) {
      const response = await joinChannel(
        obj.id_channel,
        passRef.current?.value
      );
      if (response.message !== "Password Incorrect") {
        refetch();
        Manualclose();
        close();
      } else {
        passRef.current.value = null;
        setValid(true);
      }
    }
  };

  const Manualclose = () => {
    setValid(false);
    onClose();
  };

  return (
    <>
      <button
        className={`flex btn btn-xs xs:btn-md lg:btn-lg font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
        onClick={onOpen}
      >
        <div className="hidden md:block">
          <IoEnterOutline />
        </div>
        Join
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={Manualclose}
        placement="center"
        closeButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Background>
                <ModalHeader className="flex flex-col gap-1">
                  Set password
                </ModalHeader>
                <ModalBody>
                  <GroupsInput
                    ref={passRef}
                    text="Password"
                    type="password"
                    customclass="w-full h-[3rem] self-center border-red-500 "
                    isPassword={true}
                    isValid={valid}
                  ></GroupsInput>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn font-body bg-palette-green hover:bg-palette-orange rounded-md text-palette-white"
                    onClick={join}
                  >
                    Submit
                  </button>
                </ModalFooter>
              </Background>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordModal;
