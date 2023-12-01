"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { LuSearch } from "react-icons/lu";
import { Channel } from "@/types";

interface friend {
  userName: string;
  avatar: string;
}

const FriendsList: friend[] = [
  { userName: "anas Reynolds", avatar: "/ozahid-.jpeg" },
  { userName: "Ahmed Towne", avatar: "/ozahid-.jpeg" },
  { userName: "achraf Wunsch", avatar: "/ozahid-.jpeg" },
  { userName: "yahya Kessler", avatar: "/ozahid-.jpeg" },
  { userName: "abdrached Rohan", avatar: "/ozahid-.jpeg" },
  { userName: "Durward Reynolds", avatar: "/ozahid-.jpeg" },
  { userName: "ahmad Towne", avatar: "/ozahid-.jpeg" },
  { userName: "anouar Wunsch", avatar: "/ozahid-.jpeg" },
  { userName: "youness Kessler", avatar: "/ozahid-.jpeg" },
  { userName: "Katelyn Rohan", avatar: "/ozahid-.jpeg" },
  { userName: "Durward Reynolds", avatar: "/ozahid-.jpeg" },
  { userName: "oussama Towne", avatar: "/ozahid-.jpeg" },
  { userName: "amjad Wunsch", avatar: "/ozahid-.jpeg" },
  { userName: "wassim Kessler", avatar: "/ozahid-.jpeg" },
  { userName: "anas Rohan", avatar: "/ozahid-.jpeg" },
  { userName: "youssef Reynolds", avatar: "/ozahid-.jpeg" },
  { userName: "amjad Towne", avatar: "/ozahid-.jpeg" },
  { userName: "oussama Wunsch", avatar: "/ozahid-.jpeg" },
  { userName: "mohamed Kessler", avatar: "/ozahid-.jpeg" },
  { userName: "hamid Rohan", avatar: "/ozahid-.jpeg" },
];

const SearchChat = ({ object }) => {
  const [FriendArr, setFriendArr] = useState(FriendsList);
  const [Input, setInput] = useState("");

  useEffect(() => {
    setFriendArr(
      FriendsList.filter((user) =>
        user.userName.toLowerCase().includes(Input.toLowerCase())
      )
    );
  }, [Input]);

  return (
    <Combobox>
      <div className="flex flex-col md:h-full relative justify-center w-[90%] max-w-[280px] sm:max-h-[60px]">
        <div className="search_input_chat md:h-[85%] w-full p-[2px] min-h-[40px] flex justify-center items-center">
          <div className="center pl-3 outline-none w-full h-full  flex justify-center items-center overflow-hidden">
            <LuSearch className="h-7 w-7 text-palette-green" />
            <Combobox.Input
              type="text"
              autoComplete="off"
              onChange={(e: any) => {
                setInput(e.target.value);
              }}
              value={Input}
              placeholder="Search"
              className="center text-palette-green font-body placeholder:font-bold fold:placeholder:text-lg placeholder-palette-grey pl-5 outline-none h-full w-[84%]"
            />
          </div>
        </div>

        <Transition
          className={"w-full z-10 relative"}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options className="bg-white max-h-[400px] overflow-y-auto my_scroll_green ml-10 min-w-[200px] shadow-lg rounded-md sm:min-w-[300px] z-30 md:left-[50%] md:translate-x-[-50%] top-2 absolute">
            {object.map((channel, index) => (
              <Combobox.Option
                className=""
                key={index}
                value={channel}
              >
                <div className="w-full px-4 flex items-center border-b  cursor-pointer rounded-md hover:bg-palette-white space-x-4 md:min-h-[80px] min-h-[70px]">
                  <img
                    src={`http://178.62.74.69:400/file/${channel.avatar}`}
                    alt="logo"
                    className="h-8   object-contain border-b-2 max-w-[220px] max-h-[220px] border-palette-orange  rounded-md sm:h-12 md:h-14"
                  />
                  <span className="font-body text-palette-green text-lg font-bold">
                    {channel.name.length > 11
                      ? channel.name.slice(0, 8) + "..."
                      : channel.name}
                  </span>
                </div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SearchChat;
