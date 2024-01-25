"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { LuSearch } from "react-icons/lu";
import { Channel, User, User_Hero } from "@/types";
import { GroupsChat } from ".";
import { getChannel } from "../data/api";

interface Props {
	object: Channel[];
	direct: Channel[];
	main: User_Hero;
	onResultIdChange: (id: string) => void;
}

const SearchChat = ({ object, onResultIdChange, main, direct }: Props) => {
	const [FriendArr, setFriendArr] = useState<Channel[]>(object);
	const [Input, setInput] = useState("");
	const [mychannel, setMyChannel] = useState<Channel | null>(null);

	useEffect(() => {
		let newFriendArr = [];

		if (object) {
			newFriendArr = object.filter((user) =>
				user.name.toLowerCase().includes(Input.toLowerCase())
			);
		}

		if (direct) {
			const filteredDirect = direct.filter((user) =>
				user.name.toLowerCase().includes(Input.toLowerCase())
			);
			newFriendArr = [...newFriendArr, ...filteredDirect];
		}

		setFriendArr(newFriendArr);
	}, [Input]);

	useEffect(() => {
		const fetchChannelDetails = async () => {
			const directChannel = FriendArr?.find(
				(channel) => channel.type === "DIRECT"
			);
			if (directChannel) {
				const result = await getChannel(directChannel.id_channel);
				if (result.Object) setMyChannel(result.Object);
			}
		};
		fetchChannelDetails();
	}, [FriendArr]);

	const user: User | null = mychannel
		? mychannel?.users.find((user) => user.id_user !== main.uid)
		: null;

	return (
		<Combobox>
			<div className="flex flex-col m-1 relative justify-center w-[96%] max-h-[150px] items-center mb-5 mt-5 md:mt-0">
				<div className="search_input_chat h-full max-w-[325px] w-full p-[2px] min-h-[40px] flex justify-center items-center">
					<div className="center  outline-none w-[98%] h-[95%]  flex justify-center items-center overflow-hidden">
						<LuSearch
							className="m-1 text-[#9C9C9C] 
                  3xl:w-8 3xl:h-8 2xl:w-7 2xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5"
						/>
						<Combobox.Input
							type="text"
							autoComplete="off"
							onChange={(e: any) => {
								setInput(e.target.value);
							}}
							value={Input}
							placeholder="Search"
							className="flex center text-[#9C9C9C] sm:placeholder-opacity-100 font-body placeholder:font-bold fold:placeholder:text-lg placeholder-palette-grey pl-5 outline-none h-[98%] w-full "
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
					<Combobox.Options className="bg-white max-h-[400px] overflow-y-auto my_scroll_green ml-10 min-w-[200px] shadow-lg rounded-md sm:min-w-[300px] z-30  md:left-[35%] md:translate-x-[-50%] top-2 absolute">
						{FriendArr?.map((channel, index) => (
							<Combobox.Option
								key={index}
								value={channel}
								onClick={() => {
									onResultIdChange(channel.id_channel);
								}}
							>
								{channel.type === "DIRECT" ? (
									<div className="w-full px-4 flex items-center border-b  cursor-pointer rounded-md hover:bg-palette-white space-x-4 md:min-h-[80px] min-h-[70px]">
										<img
											src={user?.avatar}
											alt="logo"
											className="h-8   object-contain border-b-2 max-w-[220px] max-h-[220px] border-palette-orange  rounded-md sm:h-12 md:h-14"
										/>
										<span className="font-body text-palette-green text-lg font-bold">
											{user?.username.length > 11
												? user?.username.slice(0, 8) +
												  "..."
												: user?.username}
										</span>
									</div>
								) : (
									<div className="w-full px-4 flex items-center border-b  cursor-pointer rounded-md hover:bg-palette-white space-x-4 md:min-h-[80px] min-h-[70px]">
										<img
											src={channel.avatar}
											alt="logo"
											className="h-8   object-contain border-b-2 max-w-[220px] max-h-[220px] border-palette-orange  rounded-md sm:h-12 md:h-14"
										/>
										<span className="font-body text-palette-green text-lg font-bold">
											{channel.name.length > 11
												? channel.name.slice(0, 8) +
												  "..."
												: channel.name}
										</span>
									</div>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

export default SearchChat;
