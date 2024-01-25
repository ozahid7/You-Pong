"use client";
import React, { forwardRef } from "react";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface GroupsInputProps {
  text: string;
  customclass?: string;
  inputclass?: string;
  type: string;
  isPassword?: boolean;
  setInput?: Function;
  isValid?: boolean;
  message?: string;
}

const GroupsInput = forwardRef<HTMLInputElement, GroupsInputProps>(
  (
    {
      text,
      customclass,
      type,
      isPassword,
      isValid,
    },
    ref
  ) => {
    let [Icon, setIcon] = useState(false);

    const hideIcon = () => {
      setIcon(!Icon);
    };

    if (isPassword) {
      type = Icon ? "text" : "password";
    }

    return (
      <>
        <div
          className={` ${customclass} ${isValid ? "search_input_chat_error animate-shake" : "search_input_chat"
            }  max-w-[400px] overflow-hidden z-10 relative w-full min-w-[120px] p-[2px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center`}
        >
          <input
            ref={ref}
            type={type}
            placeholder={text}
            className={` ${isPassword ? "pr-12" : "pr-2"
              }  center  placeholder-placeholdercolor placeholder:text-sm placeholder:font-body sm:placeholder:text-md text-gray-500 pl-5 outline-none h-[96%] w-[99%] flex justify-center items-center overflow-hidden font-body font-[600]`}
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
      </>
    );
  }
);

export default GroupsInput;
