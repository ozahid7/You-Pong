"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { LuSearch } from "react-icons/lu";
import { searchUsers } from "@/types/Api";
import Link from "next/link";
import { UseQueryResult } from "@tanstack/react-query";
import { input } from "@nextui-org/theme";

const SearchBar = (props: { search: UseQueryResult<searchUsers, Error> }) => {
	const [FriendArr, setFriendArr] = useState<searchUsers>(null);
	const [Input, setInput] = useState("");

	useLayoutEffect(() => {
		if (Input.length === 0) {
			setFriendArr(null);
		} else
			props.search.refetch().then((response) => {
				setFriendArr(
					response.data.filter((user) =>
						user.username
							.toLowerCase()
							.includes(Input.toLowerCase())
					)
				);
			});
	}, [Input]);

	return (
		<Combobox>
			<div className="flex flex-col h-full  relative justify-center w-full max-w-[220px] sm:max-h-[60px] ">
				<div className="search_input w-full p-[2px] min-h-[40px] flex justify-center items-center">
					<div className="center pl-3 outline-none w-full h-full  flex justify-center items-center overflow-hidden">
						<LuSearch className="h-7 w-7 text-white" />
						<Combobox.Input
							type="text"
							autoComplete="off"
							onChange={(e: any) => {
								setInput(e.target.value);
							}}
							value={Input}
							placeholder="Search"
							className="center text-white font-body placeholder:font-bold fold:placeholder:text-lg placeholder-palette-grey pl-5 outline-none h-full w-[84%]"
						/>
					</div>
				</div>
				{FriendArr && (
					<Transition
						className={"w-full z-10 relative"}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Combobox.Options
							onMouseUp={() => {
								setInput("");
							}}
							hidden={Input === ""}
							className="bg-white max-h-[400px] overflow-y-auto my_scroll_green  min-w-[200px] shadow-lg rounded-md sm:min-w-[300px] z-30 md:left-[50%] md:translate-x-[-50%] top-2 absolute"
						>
							{FriendArr?.map((person, index) => (
								<Combobox.Option
									className=""
									key={index}
									value={person}
									onClick={() => {
										setInput("");
									}}
								>
									<Link
										href={"/user/" + person.username}
										className="w-full px-4 flex items-center border-b  cursor-pointer rounded-md hover:bg-palette-white space-x-4 md:min-h-[80px] min-h-[70px]"
									>
										<img
											src={person.avatar}
											alt="logo"
											className="h-8 aspect-1  object-cover border-b-2 max-w-[220px] max-h-[220px] border-palette-orange  rounded-md sm:h-12 md:h-14"
										/>
										<span className="font-body text-palette-green text-lg font-bold">
											{person.username.length > 13
												? person.username.slice(0, 12) +
												  "."
												: person.username}
										</span>
									</Link>
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Transition>
				)}
			</div>
		</Combobox>
	);
};

export default SearchBar;
