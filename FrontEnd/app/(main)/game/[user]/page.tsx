"use client";
import React, { useEffect, useRef, useState } from "react";
import { MyContainer, ScoreCard } from "@/components";
import GameSettings from "./GameOptions";
import PlayerLoader from "./PlayerLoader";
import MyCountDown from "./CountDown";
import { Game } from "./Game";
import { useUser } from "@/api/getHero";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";
import { useGameContext } from "@/providers/InviteProvider";

interface pageProps {
	params: { user: string };
}

export default function game({ params }: pageProps) {
	const [map, setMap] = useState("classic");
	const [mode, setMode] = useState("easy");
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	const [showPlayerLoader, setShowPlayerLoder] = useState(false);
	const [showCounter, setShowCounter] = useState(false);
	const [width, setWidht] = useState<number>();
	const [height, setHeight] = useState<number>();
	const user = useUser(true);
	const { globalSocket } = useGlobalSocket();
	const [showGameOption, setShowGameOption] = useState(true);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if (params.user != "me" && params.user.length < 12) {
			setShowGameOption(false);
			const mode = params.user.slice(0, 4);
			const map = params.user.slice(4);
			if (mode !== "easy" && mode !== "hard")
				router.push(myRoutes.dashboard);
			if (map !== "classic" && map !== "orange" && map !== "green")
				router.push(myRoutes.dashboard);

			setMode(mode);
			setMap(map);
			setShowPlayerLoder(true);
		}
		setSubmit(true);
	}, []);

	useEffect(() => {
		if (showPlayerLoader) {
			const updateSize = () => {
				setHeight(window.innerHeight);
				setWidht(window.innerWidth);
			};
			window.addEventListener("resize", updateSize);
			updateSize();
			const game = new Game(ref.current, map);

			return () => {
				game.destroy();
				window.removeEventListener("resize", updateSize);
			};
		}
	}, [width, height, showPlayerLoader, submit]);

	const [game_id, SetGameId] = useState(
		new Date() + user.data.uid + params.user
	);
	return (
		<div className="flex w-full h-[90%] max-w-[1400px] justify-center items-center ">
			<div className="flex w-[88%] h-[90%]">
				<MyContainer>
					<div className="flex flex-col items-center space-y-2 w-full h-full">
						<div className="flex  justify-center w-full min-h-[60px] h-[7.5%]">
							<ScoreCard />
						</div>
						<div className="w-full p-8 bg-palette-grey flex justify-center border-[6px] max-w-[900px] border-palette-white h-[92%] rounded-md shadow-xl ">
							<div
								ref={ref}
								className="flex   w-full max-w-[700px] rounded-md overflow-hidden h-full"
							></div>
						</div>
					</div>
					<MyCountDown
						isOpen={showCounter}
						setIsOpen={setShowCounter}
					/>
					<GameSettings
						isOpen={showGameOption}
						setIsOpen={setShowGameOption}
						showPlayerLoader={setShowPlayerLoder}
						setMode={setMode}
						setMap={setMap}
						map={map}
						mode={mode}
						opponent_uid={params.user}
						my_id={user.data.uid}
						socket={globalSocket}
						game_id={game_id}
					/>
					{showPlayerLoader && (
						<PlayerLoader
							path={params.user}
							isOpen={showPlayerLoader}
							showCounter={setShowCounter}
							showLoader={setShowPlayerLoder}
							avatar={user.data.avatar}
							username={user.data.username}
							level={user.data.level}
							map={map}
							mode={mode}
							opponent_uid={params.user}
							my_id={user.data.uid}
							socket={globalSocket}
							game_id={game_id}
						/>
					)}
				</MyContainer>
			</div>
		</div>
	);
}
