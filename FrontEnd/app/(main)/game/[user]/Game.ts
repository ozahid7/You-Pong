import * as Matter from "matter-js";

import {
	getBall,
	getBottomPaddle,
	getBottomWall,
	getLeftWall,
	getRightWall,
	getTopPaddle,
	getTopWall,
	myRender,
} from "./gameUtils";
import { Socket } from "socket.io-client";
import { Info } from "./GameProvider";
import { inviteReturn } from "@/types/game";

export const {
	Engine,
	Render,
	World,
	Bodies,
	Composite,
	Body,
	Events,
	Mouse,
	Runner,
	MouseConstraint,
} = Matter;

export class Game {
	height: number;
	width: number;
	render: Matter.Render;
	engine: Matter.Engine;
	topPaddle: Matter.Body;
	bottomPaddle: Matter.Body;
	ball: Matter.Body;
	walls: Matter.Body[] = [];
	mouse: Matter.Mouse;
	mouseConstraint: Matter.mouseConstraint;
	socket: Socket;
	paddleSize: number;
	gameData: inviteReturn;

	constructor(
		container: HTMLDivElement,
		map: string,
		socket: Socket,
		mode: string,
		gameData: inviteReturn
	) {
		this.height = container.clientHeight;
		this.width = container.clientWidth;
		this.socket = socket;
		this.gameData = gameData;

		console.log("match id = ", this.gameData);
		let strokeColor: string;
		let fillColor: string;
		let background: string;

		// console.log("hello", id_match);
		this.paddleSize = mode === "easy" ? 4 : 6;
		if (map === "orange") {
			fillColor = "#EB6440";
			strokeColor = "#EB6440";
			background = "white";
		} else if (map === "green") {
			fillColor = "#497174";
			strokeColor = "#497174";
			background = "white";
		} else {
			fillColor = "#ffffff";
			strokeColor = "#ffffff";
			background = "black";
		}

		const wallOptions = {
			isStatic: true,
			render: {
				fillStyle: fillColor,
				strokeStyle: strokeColor,
			},
		};

		this.engine = Engine.create();

		// Create a render
		this.render = Render.create({
			element: container,
			engine: this.engine,
			options: {
				width: this.width,
				height: this.height,
				wireframes: false,
				background: background,
				chamfer: { radius: 60 },
			},
		});

		//init players
		this.bottomPaddle = getBottomPaddle(
			this.width,
			this.height,
			{
				isStatic: true,
				render: {
					fillStyle: fillColor,
					strokeStyle: strokeColor,
				},
				chamfer: { radius: [7, 7, 0, 0] },
			},
			this.paddleSize
		);
		this.topPaddle = getTopPaddle(
			this.width,
			{
				isStatic: true,
				render: {
					fillStyle: fillColor,
					strokeStyle: strokeColor,
				},
				chamfer: { radius: [0, 0, 7, 7] },
			},
			this.paddleSize
		);

		//init walls
		this.walls.push(getTopWall(this.width, Bodies, wallOptions));
		this.walls.push(
			getBottomWall(this.height, this.width, Bodies, wallOptions)
		);
		this.walls.push(getLeftWall(this.height, Bodies, wallOptions));
		this.walls.push(
			getRightWall(this.height, this.width, Bodies, wallOptions)
		);

		//init ball
		this.ball = getBall(this.width, this.height, wallOptions);

		this.mouse = Matter.Mouse.create(this.render.canvas);
		this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
			mouse: this.mouse,
		});

		this.mouse = Matter.Mouse.create(this.render.canvas);
		this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
			mouse: this.mouse,
		});

		// Add all the bodies to the world
		World.add(this.engine.world, [
			...this.walls,
			this.topPaddle,
			this.bottomPaddle,
			this.ball,
		]);
		World.add(this.engine.world, this.mouseConstraint);

		// Run the engine
		Runner.run(this.engine);

		// Run the renderer
		Render.run(this.render);

		// Set up mouse events
		this.listenToRender();
		this.emitToUpdateFrame();
		this.setupMouseEvents();
	}

	emitToUpdateFrame() {
		setInterval(() => {
			this.socket.emit("updateFrame", {
				fieald: { height: 800, width: 600 },
				ball: { x: 0, y: 0 },
			});
		}, 1000 / 60);
	}

	listenToRender() {
		// if (this.socket.listeners("render").length === 0)
		this.socket.on("render", (data: Info) => {
			Matter.Body.setPosition(this.ball, {
				x: data.ball.x,
				y: data.ball.y,
			});

			//change opponent position

			// Matter.Body.setPosition(this.topPaddle, {
			// 	x: data.opponent.x,
			// 	y: data.opponent.y,
			// });

			//change my position

			// Matter.Body.setPosition(this.bottomPaddle, {
			// 	x: data.player.x,
			// 	y: data.player.y,
			// });
		});
	}

	setupMouseEvents() {
		const max = this.width - this.width / this.paddleSize / 2;
		const min = this.width / this.paddleSize / 2;

		Matter.Events.on(
			this.mouseConstraint,
			"mousemove",
			(event: Matter.IMouseEvent) => {
				if (
					this.mouse.position.x < max &&
					this.mouse.position.x > min
				) {
					this.socket.emit("updateFrame", {
						player: {
							x: this.mouse.position.x,
							y: this.mouse.position.y,
						},
						fieald: { height: 800, width: 600 },
						id_match: "test",
					});
				}
			}
		);
	}

	destroy() {
		Render.stop(this.render);
		Engine.clear(this.engine);
	}
}
