"use client";
import React from "react";
import AchievementCard from "./AchievementCard";
import HistoryCard from "./HistoryCard";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGameCard from "./NewGameCard";
import Loader from "@/components/tools/Loader";
import useOtherUser from "@/api/useOtherUser";
import { useUser } from "@/api/getHero";
import NotFound from "./NotFound";

interface pageProps {
	params: { profile: string };
}

const page = ({ params }: pageProps) => {
	const { data, isLoading, isFetching } = useOtherUser(params.profile, true);
	const user = useUser(true, undefined);
	const isMe = !data || data === undefined ? true : false;
	const toShow = !isMe ? data : user.data;

	const {
		username,
		avatar,
		rank,
		level,
		matchs,
		wins,
		loses,
		status,
		user_relation,
		uid,
		createdAt,
		updatedAt,
	} = toShow;

	if (isLoading || (!data && !user.data)) return <Loader />;
	if (params.profile !== "profile" && !data && !isFetching)
		return <NotFound />;
	else
		return (
			<div className="w-full 2xl:w-[92%] xl:min-h-[88vh] pb-24 h-auto  flex flex-col xl:flex-row">
				<div className="w-full flex flex-col md:flex-row xl:w-[66%]">
					<div className="w-full max-h-[600px] md:max-h-none min-h-[44vh]  h:min-h-[66vh] md:w-[60%] h-full flex items-center justify-center  ">
						<div className="h-full md:h-[90%] w-full md:w-[90%] lg:w-[80%] xl:w-[90%] flex flex-col items-center justify-between h:justify-around md:justify-between">
							<PlayerCard
								uid={uid}
								username={username}
								rank={rank}
								level={level}
								user_relation={user_relation}
								avatar={avatar}
								status={status}
								param={params.profile}
								isMe={isMe}
								user={user}
							/>
							<OverviewCard wins={wins} loses={loses} />
							<NewGameCard />
						</div>
					</div>
					<div className="w-full md:w-[40%] flex justify-center items-center min-h-[500px]">
						<AchievementCard uid={uid} />
					</div>
				</div>
				<div className="w-full flex justify-center min-h-[500px] items-center xl:w-[34%]">
					<HistoryCard uid={uid} me={user.data.username} />
				</div>
			</div>
		);
};

export default page;
