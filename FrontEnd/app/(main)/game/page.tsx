"use client";
import React, { useEffect, useRef, useState } from "react";
import { MyContainer, ScoreCard } from "@/components";
import Matter from "matter-js";
import GameSettings from "./GameOptions";
import PlayerLoader from "./PlayerLoader";
import MyCountDown from "./CountDown";
import { Game } from "./Game";

export default function game() {
	const [map, setMap] = useState("orange");
	const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState("easy");
	const [showPlayerLoader, setShowPlayerLoder] = useState(false);
	const [showCounter, setShowCounter] = useState(false);
	const [width, setWidht] = useState<number>();
	const [height, setHeight] = useState<number>();
	const [{ widowWidth, windowHeight }, setWindowSize] = useState<{
		widowWidth: number;
		windowHeight: number;
	}>({ widowWidth: 0, windowHeight: 0 });

	useEffect(() => {
		// Setup Matter.js
		setHeight(ref.current.offsetHeight);
		setWidht(ref.current.offsetWidth);
		// Create a renderer and specify the container

		const game = new Game(height, width, ref.current);

		return () => {
			game.destroy()
		}
	}, [ref.current]);

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
					<MyCountDown isOpen={false} setIsOpen={setShowCounter} />
					<GameSettings
						showPlayerLoader={setShowPlayerLoder}
						setMode={setMode}
						setMap={setMap}
					/>
					{showPlayerLoader && (
						<PlayerLoader
							isOpen={false}
							showCounter={setShowCounter}
							showLoader={setShowPlayerLoder}
						/>
					)}
				</MyContainer>
			</div>
		</div>
	);
}
