"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { LuSearch } from "react-icons/lu";
import { Channel } from "@/types";
import { GroupsChat } from ".";

interface friend {
  userName: string;
  avatar: string;
}

const SearchChat = ({}) => {
  //   const [FriendArr, setFriendArr] = useState(object);
  //   const [Input, setInput] = useState("");
  //   const showGroup = (channel: Channel) => {};
  //   useEffect(() => {
  //     setFriendArr(
  //       object.filter((user) =>
  //         user.name.toLowerCase().includes(Input.toLowerCase())
  //       )
  //     );
  //   }, [Input]);
  //   return (
  //     <Combobox>
  //       <div className="flex flex-col m-1 relative justify-center w-[96%] h-[9%] ">
  //         <div className="search_input_chat md_:h-[88%] sm_:h-[70%] w-full p-[2px] min-h-[40px] flex justify-center items-center">
  //           <div className="center  outline-none w-full h-full  flex justify-center items-center overflow-hidden">
  //             <LuSearch className="m-1 text-palette-green xs:w-[25px] sm_:block xxs:hidden
  //                 3xl_:w-8 3xl_:h-8 2xl_:w-7 2xl_:h-7 lg_:w-6 lg_:h-6 md_:w-5 md_:h-5" />
  //             <Combobox.Input
  //               type="text"
  //               autoComplete="off"
  //               onChange={(e: any) => {
  //                 setInput(e.target.value);
  //               }}
  //               value={Input}
  //               placeholder="Search"
  //               className="flex center text-palette-green sm:placeholder-opacity-100 xxs:placeholder-opacity-0 font-body placeholder:font-bold fold:placeholder:text-lg placeholder-palette-grey pl-5 outline-none h-full w-full 2xl_:placeholder:text-[28px] lg_:placeholder:text-[25px] md_:placeholder:text-[20px]"
  //             />
  //           </div>
  //         </div>
  //         <Transition
  //           className={"w-full z-10 relative"}
  //           enter="transition duration-100 ease-out"
  //           enterFrom="transform scale-95 opacity-0"
  //           enterTo="transform scale-100 opacity-100"
  //           leave="transition duration-75 ease-out"
  //           leaveFrom="transform scale-100 opacity-100"
  //           leaveTo="transform scale-95 opacity-0"
  //         >
  //           <Combobox.Options className="bg-white max-h-[400px] overflow-y-auto my_scroll_green ml-10 min-w-[200px] shadow-lg rounded-md sm:min-w-[300px] z-30 md:left-[50%] md:translate-x-[-50%] top-2 absolute">
  //             {FriendArr => (
  //               <Combobox.Option
  //                 key={index}
  //                 value={channel}
  //                 onClick={() => {
  //                   showGroup(channel);
  //                 }}
  //               >
  //                 <div className="w-full px-4 flex items-center border-b  cursor-pointer rounded-md hover:bg-palette-white space-x-4 md:min-h-[80px] min-h-[70px]">
  //                   <img
  //                     src={`http://localhost:4000/file/${channel.avatar}`}
  //                     alt="logo"
  //                     className="h-8   object-contain border-b-2 max-w-[220px] max-h-[220px] border-palette-orange  rounded-md sm:h-12 md:h-14"
  //                   />
  //                   <span className="font-body text-palette-green text-lg font-bold">
  //                     {channel.name.length > 11
  //                       ? channel.name.slice(0, 8) + "..."
  //                       : channel.name}
  //                   </span>
  //                 </div>
  //               </Combobox.Option>
  //             ))}
  //           </Combobox.Options>
  //         </Transition>
  //       </div>
  //     </Combobox>
  //   );
};

export default SearchChat;
