"use client";
import React, { useRef } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MyContainer } from "..";
import { twMerge } from "tailwind-merge";

interface MyDialogProps {
	isOpen: boolean;
	closemodal: () => void;
	children?: React.ReactNode;
	withCorner?: boolean;
	customClass?: string;
	withClose?: boolean;
	conClass?: string;
}

function MyDialog({
	isOpen,
	closemodal,
	children,
	withCorner,
	customClass,
	withClose,
	conClass,
}: MyDialogProps) {
	const classname = twMerge("flex justify-center", customClass);
	const dialogRef = useRef();
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				initialFocus={dialogRef}
				as="div"
				className="relative z-10"
				open={isOpen}
				onClose={closemodal}
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
					<div className="fixed inset-0 bg-black/30 backdrop-blur-[10px]" />
				</Transition.Child>
				<div className="fixed h-full w-full max-h-screen flex justify-center items-center inset-0 overflow-auto">
					<div className={classname}>
						<MyContainer
							isLoader={withClose}
							costumClass={conClass}
							withCorners={withCorner}
							closeModal={closemodal}
							isModal={true}
						>
							<div className=" make_center h-[100%]">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full h-full">
										{children}
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
