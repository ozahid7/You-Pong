"use client";
import React, { useEffect, useRef, useState } from "react";
import { MyContainer, ScoreCard } from "@/components";
import Matter from "matter-js";
import GameSettings from "./GameOptions";
import PlayerLoader from "./PlayerLoader";
import MyCountDown from "./CountDown";

export default function game() {
	const [map, setMap] = useState("orange");
	const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState("easy");
	const [showPlayerLoader, setShowPlayerLoder] = useState(false);
	const [showCounter, setShowCounter] = useState(false);
	const [width, setWidht] = useState<number>();
	const [Hieght, setHieght] = useState<number>();

	useEffect(() => {
		// Setup Matter.js
		const { Engine, Render, World, Bodies, Composite } = Matter;
		const engine = Engine.create();

		// Create a renderer and specify the container
		const render = Render.create({
			element: ref.current,
			engine: engine,
			options: {
				width: ref.current.offsetHeight,
				height: ref.current.offsetWidth,
				wireframes: false,
				background: "white",
			},
		});

		// Create some physics bodies
		// Create walls around the canvas
		const wallOptions = {
			isStatic: true,
			render: {
				fillStyle: "#EB6440",
				strokeStyle: "#EB6440",
			},
		};

		const wallThickness = 2;

		const wallTop = Bodies.rectangle(
			ref.current.offsetWidth / 2,
			wallThickness / 2,
			ref.current.offsetWidth + 2,
			wallThickness,
			wallOptions
		);
		const bottomWall = Bodies.rectangle(
			ref.current.offsetWidth / 2,
			435,
			ref.current.offsetWidth,
			wallThickness,
			wallOptions
		);

		const leftWall = Bodies.rectangle(
			wallThickness / 2,
			200,
			wallThickness * 2,
			ref.current.offsetHeight,
			wallOptions
		);

		const rectangle = Bodies.rectangle(
			ref.current.offsetWidth - (wallThickness - 1),
			33,
			wallThickness * 2,
			ref.current.offsetHeight,
			wallOptions
		);

		console.log("h = ", ref.current.offsetHeight);

		World.add(engine.world, [wallTop, bottomWall, leftWall, rectangle]);

		// Start the engine
		Matter.Runner.run(engine);

		// Start the renderer
		Render.run(render);

		// Cleanup on component unmount
		return () => {
			Render.stop(render);
			Engine.clear(engine);
		};
	}, []);

	return (
		<div className="flex w-full h-[90%] max-w-[1400px] justify-center items-center ">
			<div className="flex w-[88%] h-[90%]">
				<MyContainer>
					<div className="flex flex-col  space-y-2 w-full h-full">
						<div className="flex  justify-center w-full min-h-[60px] h-[7.5%]">
							<ScoreCard />
						</div>
						<div className="w-full p-8 bg-palette-grey border-[6px] border-palette-white h-[92%] rounded-md shadow-xl ">
							<div
								ref={ref}
								className="flex min-w-full  w-full overflow-hidden h-full"
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
