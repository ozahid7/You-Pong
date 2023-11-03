"use client";
import React from "react";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MyContainer } from "..";

function MyDialog({children}: {children: React.ReactNode}) {
    let [isOpen, setIsOpen] = useState(true);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>
                <div className="fixed h-full w-full flex justify-center items-center inset-0 overflow-auto">
                    <div className="flex justify-center w-[90%] h-[80%]">
                        <MyContainer isActive={true}>
                            <div className=" make_center h-[100%] overflow-auto">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </MyContainer>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default MyDialog;
