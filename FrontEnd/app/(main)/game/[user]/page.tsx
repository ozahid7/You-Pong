"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import GameSettings from "./GameOptions";
import PlayerLoader from "./PlayerLoader";
import MyCountDown from "./CountDown";
import { useUser } from "@/api/getHero";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";
import { OtherUser } from "@/utils/game";
import Loader from "@/components/tools/Loader";
import GameProvider, {
	Info,
	ball,
	opponent,
	player,
	useGameContext,
} from "./GameProvider";
import { useGlobalContext } from "@/providers/SocketProvider";
import { inviteReturn } from "@/types/game";
import Message from "./Message";
import { MyContainer, ScoreCard } from "@/components";
import { Game } from "./Game";

interface pageProps {
	params: { user: string };
}

export default function game({ params }: pageProps) {
	//game properties
	const [map, setMap] = useState("classic");
	const [mode, setMode] = useState("easy");
	const [showCounter, setShowCounter] = useState(false);
	const [showPlayerLoader, setShowPlayerLoder] = useState(false);
	const [showGameOption, setShowGameOption] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [cloneData, setCloneData] = useState<inviteReturn>();
	const [scores, setScores] = useState({ player: 0, opponent: 0 });
	const { data } = useGlobalContext();
	let game: Game = null;

	//game ref and sizes
	const ref = useRef<HTMLDivElement>(null);
	const [width, setWidht] = useState<number>();
	const [height, setHeight] = useState<number>();

	const user = useUser(true);
	const router = useRouter();

	//infos in score card
	const [otherUser, setOtherUser] = useState<OtherUser>({
		username: undefined,
		avatar: undefined,
	});

	//validators
	const [submit, setSubmit] = useState(false);
	const [checker, setChecker] = useState(false);
	const [toStart, setToStart] = useState(false);

	// sockets
	const { globalSocket } = useGlobalSocket();

	//gameData
	const gameContext = useGameContext();

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

	useLayoutEffect(() => {
		if (user.data && user.data.status === "INGAME") {
			router.push(myRoutes.dashboard);
		}
		if (user.data) setChecker(true);
	}, []);

	useEffect(() => {
		if (data !== undefined) setCloneData(data);
	}, [data]);

	useEffect(() => {
		if (ref.current) {
			const updateSize = () => {
				setHeight(window.innerHeight);
				setWidht(window.innerWidth);
			};

			// window.addEventListener("resize", updateSize);
			updateSize();
			game = new Game(ref.current, map, globalSocket, mode, cloneData);

			return () => {
				game.destroy();
			};
		}
	}, [cloneData]);

	useEffect(() => {
		if (game) {
			if (globalSocket.listeners("renderBall").length === 0)
				globalSocket.on("renderBall", (data: ball) => {
					game.updateBallPosition(data);
				});
			if (globalSocket.listeners("renderPaddle").length === 0)
				globalSocket.on("renderPaddle", (data: player) => {
					game.updatePlayerPosition(data);
				});
			if (globalSocket.listeners("renderOpponent").length === 0)
				globalSocket.on("renderOpponent", (data: opponent) => {
					game.updateOpponentPosition(data);
				});
			if (globalSocket.listeners("endGame").length === 0)
				globalSocket.on("endGame", () => {
					console.log("endgame");
					setShowMessage(true);
					game.stopIntervall();
					game.destroy();
				});
			if (globalSocket.listeners("gameOver").length === 0)
				globalSocket.on("gameOver", () => {
					console.log("gameOver");
					setShowMessage(true);
					game.stopIntervall();
					game.destroy();
				});
			if (globalSocket.listeners("updateScore").length === 0)
				globalSocket.on("updateScore", (data) => {
					console.log("data = ", data);
					setScores(data);
				});
		}
	}, [toStart]);

	const [game_id, SetGameId] = useState(
		new Date() + user.data.uid + params.user
	);
	if (!checker) return <Loader />;
	return (
		<GameProvider>
			<div className="flex w-full h-[90%] max-w-[1400px] justify-center ">
				<div className="flex w-[88%] h-[90%]">
					<MyContainer>
						<div className="flex flex-col items-center space-y-2 w-full h-full">
							<div className="flex  justify-center w-full min-h-[60px] h-[7.5%]">
								{otherUser.avatar !== undefined && (
									<ScoreCard
										username={user.data.username}
										avatar={user.data.avatar}
										otheravatar={otherUser.avatar}
										otherusername={otherUser.username}
										scores={scores}
									/>
								)}
							</div>
							<div className="w-full p-8 bg-palette-grey flex justify-center border-[6px] max-w-[900px] border-palette-white h-[90%] rounded-md shadow-xl ">
								<div
									ref={ref}
									className="flex w-[600px]  h-[800px] rounded-md overflow-hidden"
								></div>
							</div>
						</div>
						<MyCountDown
							isOpen={showCounter}
							setIsOpen={setShowCounter}
						/>
						{showMessage && (
							<Message
								isOpen={showMessage}
								bgColor={
									scores.player > scores.opponent
										? "bg-palette-green"
										: "bg-palette-orange"
								}
								setIsOpen={setShowMessage}
							/>
						)}
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
							status={user.data.status}
							user={user}
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
								setotheruser={setOtherUser}
								setToStart={setToStart}
							/>
						)}
					</MyContainer>
				</div>
			</div>
		</GameProvider>
	);
}
