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

let game: Game = null;

export default function game_({ params }: pageProps) {
	//game properties
	const [map, setMap] = useState("CLASSIC");
	const [mode, setMode] = useState("EASY");
	const [showCounter, setShowCounter] = useState(false);
	const [showPlayerLoader, setShowPlayerLoder] = useState(false);
	const [showGameOption, setShowGameOption] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [cloneData, setCloneData] = useState<inviteReturn>();
	const [scores, setScores] = useState({ player: 0, opponent: 0 });
	const { data } = useGlobalContext();
	let interval = null;

	//game ref and sizes
	const ref = useRef<HTMLDivElement>(null);
	const [width, setWidht] = useState<number>();
	const [height, setHeight] = useState<number>();

	const user = useUser(true, undefined);
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
			if (mode !== "EASY" && mode !== "HARD")
				router.push(myRoutes.dashboard);
			if (map !== "CLASSIC" && map !== "ORANGE" && map !== "GREEN")
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
		const handleResize = () => {
			setWidht(ref.current?.clientWidth);
			setHeight(ref.current?.clientHeight);
		};
		window.addEventListener("resize", handleResize);
		// Cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (ref.current) {
			game = new Game(ref.current, map, globalSocket, mode, cloneData);
			if (!interval) {
				setTimeout(() => {
					if (game) interval = game.emitToUpdateFrame_First();
				}, 8000);
			} else {
				clearInterval(interval);
				if (game) {
					game.stopIntervall();
					interval = game.emitToUpdateFrame();
				}
			}
		}
		return () => {
			game?.destroy();
		};
	}, [cloneData, width, height]);

	useEffect(() => {
		if (game) {
			if (globalSocket.listeners("renderBall").length === 0)
				globalSocket.on("renderBall", (data: ball, x: number) => {
					if (game) game.updateBallPosition(data, x);
				});
			if (globalSocket.listeners("renderPaddle").length === 0)
				globalSocket.on("renderPaddle", (data: player) => {
					if (game) game.updatePlayerPosition(data);
				});
			if (globalSocket.listeners("renderOpponent").length === 0)
				globalSocket.on("renderOpponent", (data: opponent) => {
					if (game) game.updateOpponentPosition(data);
				});
			if (globalSocket.listeners("endGame").length === 0)
				globalSocket.on("endGame", () => {
					setShowMessage(true);
					setTimeout(() => {
						setShowMessage(false);
						router.replace(myRoutes.dashboard);
					}, 4000);
					game.stopIntervall();
					game.init();
					interval = null;
					game.destroy();
					game = null;
					return;
				});
			if (globalSocket.listeners("gameOver").length === 0)
				globalSocket.on("gameOver", (obj) => {
					if (!obj.is_me) {
						console.log(obj.is_me);
						setScores({ player: 7, opponent: 0 });
						setShowMessage(true);
						setTimeout(() => {
							setShowMessage(false);
							router.replace(myRoutes.dashboard);
						}, 4000);
					}
					game.stopIntervall();
					game.init();
					interval = null;
					game.destroy();
					game = null;
					return;
				});
			if (globalSocket.listeners("updateScore").length === 0)
				globalSocket.on("updateScore", (data) => {
					setScores(data);
				});
		}
		return () => {
			globalSocket.off("renderBall");
			globalSocket.off("renderPaddle");
			globalSocket.off("renderOpponent");
			globalSocket.off("endGame");
			globalSocket.off("updateScore");
		};
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
							<div className="w-full p-8 bg-palette-grey flex justify-center border-[6px] max-w-[1000px] border-palette-white h-[100%] rounded-md shadow-xl items-center">
								<div
									ref={ref}
									className="w-[100%] h-[100%] flex justify-center items-center"
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
