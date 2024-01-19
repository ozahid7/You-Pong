import * as Matter from "matter-js";

import {
	getBall,
	getBottomPaddle,
	getBottomWall,
	getDashedLine,
	getLeftWall,
	getRightWall,
	getTopPaddle,
	getTopWall,
} from "./gameUtils";
import { Socket } from "socket.io-client";
import { ball, opponent, player } from "./GameProvider";
import { inviteReturn } from "@/types/game";
import { Positions } from "@/types";
import { color } from "framer-motion";

export interface Scores {
	player: number;
	opponent: number;
}

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

let positions: Positions = {
	ball: { x: 0, y: 0 },
	opponent: { x: 0, y: 0 },
	player: { x: 0, y: 0 },
};

let temp: number = 0;

export class Game {
	height: number;
	width: number;
	render: Matter.Render;
	engine: Matter.Engine;
	topPaddle: Matter.Body;
	bottomPaddle: Matter.Body;
	leftObstacle: Matter.Body;
	rightObstacle: Matter.Body;
	ball: Matter.Body;
	walls: Matter.Body[] = [];
	dashedLine: Matter.Body;
	mouse: Matter.Mouse;
	mouseConstraint: Matter.mouseConstraint;
	socket: Socket;
	paddleSize: number;
	obstacleSize: number;
	gameData: inviteReturn;
	tmpX: number = 0;
	scores: Scores;
	interval: any;
	element: HTMLElement;
	scale: number = 1;

	constructor(
		container: HTMLDivElement,
		map: string,
		socket: Socket,
		mode: string,
		gameData: inviteReturn
	) {
		this.element = container;

		this.socket = socket;
		this.gameData = gameData;

		let strokeColor: string;
		let fillColor: string;
		let background: string;

		this.paddleSize = mode === "easy" ? 160 : 100;
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

		mode === "easy" ? (this.obstacleSize = 200) : (this.obstacleSize = 100);

		const wallOptions = {
			isStatic: true,
			render: {
				fillStyle: fillColor,
				strokeStyle: strokeColor,
			},
		};

		[this.width, this.height] = this.FixSizeRatio();
		this.ScaleUpdate();

		this.engine = Engine.create({ gravity: { x: 0, y: 0 } });

		// Create a render
		this.render = Render.create({
			element: this.element,
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
		let posX: number = 0;

		positions.player.x === 0
			? (posX = this.width / 2)
			: (posX = this.remap(
					positions.player.x,
					positions.player.y,
					this.width
			  ));
		console.log(
			"newPOS",
			this.remap(positions.player.x, positions.player.y, this.width),
			"newWIDTH",
			this.width
		);

		this.bottomPaddle = getBottomPaddle(
			posX,
			this.height,
			{
				isStatic: true,
				render: {
					fillStyle: fillColor,
					strokeStyle: strokeColor,
				},
				chamfer: { radius: [7, 7, 0, 0] },
			},
			this.remap(this.paddleSize, 600, this.width),
			this.remap(15, 800, this.height),
			this.remap(45, 800, this.height)
		);

		positions.opponent.x !== 0
			? (positions.opponent.x =
					this.remap(positions.opponent.x, 600, this.width) * 2)
			: (positions.opponent.x = this.width);

		this.topPaddle = getTopPaddle(
			positions.opponent.x,
			{
				isStatic: true,
				render: {
					fillStyle: fillColor,
					strokeStyle: strokeColor,
				},
				chamfer: { radius: [0, 0, 7, 7] },
			},
			this.remap(this.paddleSize, 600, this.width),
			this.remap(15, 800, this.height),
			this.remap(45, 800, this.height)
		);

		//init walls
		this.walls.push(
			getTopWall(
				this.width,
				Bodies,
				wallOptions,
				this.remap(10, 800, this.height)
			)
		);
		this.walls.push(
			getBottomWall(
				this.height,
				this.width,
				Bodies,
				wallOptions,
				this.remap(10, 800, this.height)
			)
		);
		this.walls.push(
			getLeftWall(
				this.height,
				Bodies,
				wallOptions,
				this.remap(10, 600, this.width)
			)
		);
		this.walls.push(
			getRightWall(
				this.height,
				this.width,
				Bodies,
				wallOptions,
				this.remap(10, 600, this.width)
			)
		);

		// init dashed line
		this.dashedLine = getDashedLine(
			this.width / 2,
			this.height / 2,
			this.width,
			this.remap(8, 800, this.height),
			this.remap(24, 600, this.width),
			fillColor
		);

		//init ball
		positions.ball.x !== 0
			? (positions.ball.x =
					this.remap(positions.ball.x, 600, this.width) * 2)
			: (positions.ball.x = this.width);
		positions.ball.y !== 0
			? (positions.ball.y =
					this.remap(positions.ball.y, 800, this.height) * 2)
			: (positions.ball.y = this.height);

		this.ball = getBall(
			positions.ball.x,
			positions.ball.y,
			this.scale,
			wallOptions
		);

		// init mouse
		this.mouse = Matter.Mouse.create(this.render.canvas);

		this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
			mouse: this.mouse,
			constraints: {
				stiffness: 0,
				render: {
					visible: false,
				},
			},
		});

		// Add all the bodies to the world
		World.add(this.engine.world, [
			...this.walls,
			...this.dashedLine,
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
		this.setupMouseEvents();
	}

	remap(value: number, max1: number, max2: number): number {
		return Math.round(max2 * (value / max1));
	}

	FixSizeRatio(): [number, number] {
		let width: number = 0;
		let height: number = 0;

		const Ratio = 3 / 4; // Aspect ratio of 800x600 (Portrait)

		if (this.element.clientWidth > this.element.clientHeight) {
			height = this.element.clientHeight;
			width = height * Ratio;
		} else {
			width = this.element.clientWidth;
			height = width / Ratio;

			if (height > this.element.clientHeight) {
				height = this.element.clientHeight;
				width = height * Ratio;
			}
		}

		return [width, height];
	}

	ScaleUpdate() {
		const ScaleWidth: number = this.width / 600;
		const ScaleHeight: number = this.height / 800;

		this.scale = ScaleWidth < ScaleHeight ? ScaleWidth : ScaleHeight;
	}

	emitToUpdateFrame() {
		this.interval = setInterval(() => {
			if (this.tmpX === 0) {
				if (
					temp + this.remap(this.paddleSize / 2, 600, this.width) <=
						this.width &&
					temp - this.remap(this.paddleSize / 2, 600, this.width) >= 0
				)
					this.tmpX = temp;
				else this.tmpX = this.width / 2;
			}
			this.socket.emit("updateFrame", {
				paddleX: this.remap(this.tmpX, this.width, 600),
				id_match: this.gameData?.id_match,
			});
		}, 1000 / 60);
		return this.interval;
	}

	emitToUpdateFrame_First() {
		this.tmpX = this.width / 2;
		this.interval = setInterval(() => {
			this.socket.emit("updateFrame", {
				paddleX: this.remap(this.tmpX, this.width, 600),
				id_match: this.gameData?.id_match,
			});
		}, 1000 / 60);
		return this.interval;
	}

	updateBallPosition(data: ball, playerX: number) {
		if (data) {
			positions.ball.x = data.x;
			positions.ball.y = data.y;
			Matter.Body.setPosition(this.ball, {
				x: this.remap(data.x, 600, this.width),
				y: this.remap(data.y, 800, this.height),
			});
		}
	}

	updateOpponentPosition(data: opponent) {
		if (data) {
			positions.opponent.x = data.x;
			positions.opponent.y = data.y;
			Matter.Body.setPosition(this.topPaddle, {
				x: this.remap(data.x, 600, this.width),
				y: this.topPaddle.position.y,
			});
		}
	}

	updatePlayerPosition(data: player) {
		if (data) {
			Matter.Body.setPosition(this.bottomPaddle, {
				x: this.remap(data.x, 600, this.width),
				y: this.bottomPaddle.position.y,
			});
		}
	}

	setupMouseEvents() {
		Matter.Events.on(
			this.mouseConstraint,
			"mousemove",
			(event: Matter.IMouseEvent) => {
				if (
					this.mouse.position.x +
						this.remap(this.paddleSize, 600, this.width) / 2 <=
						this.width &&
					this.mouse.position.x -
						this.remap(this.paddleSize, 600, this.width) / 2 >=
						0
				) {
					this.tmpX = this.mouse.position.x;
					temp = this.tmpX;
					positions.player.x = this.mouse.position.x;
					positions.player.y = this.width;
					console.log("mouse", temp, "width", this.width);
				}
			}
		);
	}

	stopIntervall() {
		clearInterval(this.interval);
	}

	destroy() {
		Render.stop(this.render);
		Engine.clear(this.engine);
		World.clear(this.engine.world, true);
		Events.off(this.engine, "mousemove");
		Composite.clear(this.engine.world, true);
		this.render.canvas.remove();
		clearInterval(this.interval);
	}
}
