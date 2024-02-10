"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface MyInputProps {
	text: string;
	customclass?: string;
	inputclass?: string;
	type: string;
	isPassword?: boolean;
	setInput?: Function;
	isValid?: boolean;
	message?: string;
	visible?: boolean;
	focus?: boolean;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
	(
		{
			text,
			customclass,
			inputclass,
			type,
			isPassword,
			setInput,
			isValid,
			focus,
			message,
			visible,
		},
		ref
	) => {
		let [Icon, setIcon] = useState(false);
		const inputRef = useRef<HTMLInputElement>();

		const hideIcon = () => {
			setIcon(!Icon);
		};

		if (isPassword) {
			type = Icon ? "text" : "password";
		}

		useEffect(() => {
			if (focus) {
				inputRef.current.focus();
			}
		}, []);

		return (
			<>
				<div
					className={` ${customclass} ${
						isValid ? "my_input_error animate-shake" : "my_input"
					}  max-w-[400px] overflow-hidden z-10 relative w-full min-w-[120px] p-[2px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center`}
				>
					<input
						disabled={visible}
						ref={inputRef}
						onChange={(e) => setInput(e.target.value)}
						type={type}
						placeholder={text}
						className={` ${
							isPassword ? "pr-12" : "pr-2"
						}  center  placeholder-placeholdercolor placeholder:text-sm placeholder:font-body sm:placeholder:text-md text-gray-500 pl-5 outline-none h-full w-full flex justify-center items-center overflow-hidden`}
					/>
					{isPassword &&
						(Icon ? (
							<BiShowAlt
								onClick={hideIcon}
								size={20}
								className="absolute text-placeholdercolor cursor-pointer right-5 color"
							/>
						) : (
							<BiHide
								onClick={hideIcon}
								size={20}
								className="absolute  text-placeholdercolor cursor-pointer right-5 color"
							/>
						))}
				</div>
				{isValid && (
					<span className="text-[#ff0000] text-[12px] text-center">
						{message}
					</span>
				)}
			</>
		);
	}
);

export default MyInput;
