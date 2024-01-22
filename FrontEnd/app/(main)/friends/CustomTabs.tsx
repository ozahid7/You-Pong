"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import FriendBanner from "./FriendBanner";
import { MyToolTip } from "@/components";
import BlockedBanner from "./BlockedBanner";
import RequestBanner from "./RequestBanner";
import MiniLoader from "@/components/tools/MiniLoader";
import { FriendArr, user } from "@/types/Api";
import { defaultavatar } from "@/const";
import { UseQueryResult } from "@tanstack/react-query";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { useGlobalContext } from "@/providers/SocketProvider";

const CustomTabs = (props: {
	input: string;
	setInput: any;
	friends: UseQueryResult<FriendArr, Error>;
}) => {
	const { accepted, blocked, pending } = props.friends.data;
	const { setRequests, requests } = useGlobalContext();

	const [ListArr, setListArr] = useState(accepted);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [RequestArr, setRequestArr] = useState(pending);
	const [BlockArr, setBlockArr] = useState(blocked);
	const [InvalidData, setInvalidData] = useState(false);

	useEffect(() => {
		if (InvalidData) {
			props.friends.refetch();
		}
		setInvalidData(false);
	}, [InvalidData]);

	useEffect(() => {
		props.friends.refetch().then((res) => {
			setBlockArr(res.data.blocked);
			setRequestArr(res.data.pending);
			setListArr(res.data.accepted);
		});
	}, [blocked, accepted, pending, requests]);

	useEffect(() => {
		if (selectedIndex === 1) setRequests(0);
	}, [requests]);

	useEffect(() => {
		setListArr(
			accepted?.filter((friend) =>
				friend.username
					.toLowerCase()
					.includes(props.input.toLowerCase())
			)
		);
		setRequestArr(
			pending.filter((friend) =>
				friend.username
					.toLowerCase()
					.includes(props.input.toLowerCase())
			)
		);
		setBlockArr(
			blocked.filter((friend) =>
				friend.username
					.toLowerCase()
					.includes(props.input.toLowerCase())
			)
		);
	}, [props.input]);

	const renderImage = (path: string) => {
		return (
			<img
				src={path || defaultavatar}
				alt="logo"
				className="h-10  object-cover aspect-1 border-2 max-w-[220px] max-h-[220px] border-white drop-shadow-md rounded-md sm:h-14 md:h-16"
			/>
		);
	};
	if (props.friends.isFetching) return <MiniLoader customClass="h-[70%]" />;
	else {
		return (
			<div className="w-full flex flex-col items-center h-[70%]">
				<Tab.Group
					selectedIndex={selectedIndex}
					onChange={(index) => {
						setSelectedIndex(index);
						props.setInput("");
					}}
				>
					<Tab.List className="bg-[#819FA1] outline-none min-h-[50px] space-x-1  py-2 w-[90%] flex rounded-sm  justify-evenly">
						<Tab
							className={`outline-none before:content-['List'] sm:before:content-['Friend_List'] text-h sm:text-sm md:text-lg font-body xl:text-xl drop-shadow-lg  ${
								selectedIndex === 0
									? "border-b-2 border-white"
									: ""
							} font-semibold text-white rounded- hover:animate-scaleAnimation hover:scale-110 transition-transform duration-500 transform`}
						></Tab>
						<Tab
							className={`outline-none text-h sm:text-sm md:text-lg before:content-['Requests'] sm:before:content-['Friend_Request'] font-body xl:text-xl drop-shadow-lg  ${
								selectedIndex === 1
									? "border-b-2 border-white"
									: ""
							} font-semibold text-white rounded- hover:animate-scaleAnimation hover:scale-110 transition-transform duration-500 transform`}
						></Tab>

						<Tab
							className={`outline-none text-h sm:text-sm md:text-lg before:content-['Blocked'] sm:before:content-['Blocked_Friends']  font-body xl:text-xl drop-shadow-lg  ${
								selectedIndex === 2
									? "border-b-2 border-white"
									: ""
							} font-semibold text-white rounded- hover:animate-scaleAnimation hover:scale-110 transition-transform duration-500 transform`}
						></Tab>
					</Tab.List>
					<Tab.Panels className="mt-4  flex overflow-y-auto  my_scroll_green flex-grow w-[90%]">
						<MyToolTip id="username" />
						<Tab.Panel className="h-[16%] md:h-[18%]  space-y-4 w-full">
							{ListArr.length === 0 ? (
								<div className="make_center h-full">
									{" "}
									<span className="font-body font-bold text-cardtitle">
										No Friends Yet
									</span>
								</div>
							) : (
								ListArr.map((e: user, index) => (
									<FriendBanner
										key={index}
										userName={e.username}
										image={renderImage(e.avatar)}
										status={e.status}
										SetInvalidData={setInvalidData}
										uid={e.id_user}
									/>
								))
							)}
						</Tab.Panel>
						<Tab.Panel className="h-[16%] md:h-[18%] space-y-4 w-full">
							{RequestArr.length === 0 ? (
								<div className="make_center h-full">
									{" "}
									<span className="font-body font-bold text-cardtitle">
										No Friends Yet
									</span>
								</div>
							) : (
								RequestArr.map((e: user, index) => (
									<RequestBanner
										key={index}
										userName={e.username}
										image={renderImage(e.avatar)}
										status={e.status}
										SetInvalidData={setInvalidData}
										uid={e.id_user}
									/>
								))
							)}
						</Tab.Panel>

						<Tab.Panel className="h-[16%] md:h-[18%] space-y-4 w-full">
							{BlockArr.length === 0 ? (
								<div className="make_center h-full">
									{" "}
									<span className="font-body font-bold text-cardtitle">
										No Friends Yet
									</span>
								</div>
							) : (
								BlockArr.map((e: user, index) => (
									<BlockedBanner
										key={index}
										friends={props.friends}
										userName={e.username}
										image={renderImage(e.avatar)}
										status={e.status}
										uid={e.id_user}
										SetInvalidData={setInvalidData}
									/>
								))
							)}
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		);
	}
};

export default CustomTabs;
