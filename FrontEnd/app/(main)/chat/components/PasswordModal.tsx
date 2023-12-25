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
import React, { useRef } from "react";
import { fetchData_userChannels, joinChannel } from "../data/api";
import { mutate } from "swr";
import { IoEnterOutline } from "react-icons/io5";
import InputGroupPass from "./InputGroupPass";

interface Props {
  obj: Channel;
  close: any;
}

const PasswordModal = ({ obj, close }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const passRef = useRef<HTMLInputElement>(null);

  const join = async () => {
    console.log(passRef.current.value);
    if (passRef.current) {
      const response = await joinChannel(
        obj.id_channel,
        passRef.current?.value
      );
      if (response.message !== "Password Incorrect") {
        mutate(fetchData_userChannels);
        close();
      } else {
        passRef.current.value = null;
      }
    }
  };

  return (
    <>
      <Button
        size="lg"
        className={`flex mt-1 text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md font-body font-[600] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
        onPress={onOpen}
      >
        <IoEnterOutline />
        Join
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        closeButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Set password
              </ModalHeader>
              <ModalBody>
                <InputGroupPass
                  ref={passRef}
                  text="Password"
                  type="password"
                  customclass="w-full h-[3rem] self-center border-red-500 "
                  isPassword={true}
                ></InputGroupPass>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  className="btn font-body"
                  onPress={join}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordModal;
