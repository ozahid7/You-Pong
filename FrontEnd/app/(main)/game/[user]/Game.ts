import * as Matter from "matter-js";

import {
	getBall,
	getBottomPaddle,
	getBottomWall,
	getLeftWall,
	getRightWall,
	getTopPaddle,
	getTopWall,
} from "./gameUtils";
import { Socket } from "socket.io-client";
import { ball, opponent, player } from "./GameProvider";
import { inviteReturn } from "@/types/game";

interface Scores {
	myScore: number;
	opponentScore: number;
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
	tmpX: number = 0;
	scores: Scores;
	interval: any;

	constructor(
		container: HTMLDivElement,
		map: string,
		socket: Socket,
		mode: string,
		gameData: inviteReturn,
		scores: Scores
	) {
		this.height = container.clientHeight;
		this.width = container.clientWidth;
		this.socket = socket;
		this.gameData = gameData;
		this.scores = scores;

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

		this.tmpX = this.bottomPaddle.position.x;
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
		this.ball.velocity.x = 5;
		this.ball.velocity.y = 5;

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
		this.emitToUpdateFrame();
		this.setupMouseEvents();
	}

	emitToUpdateFrame() {
		this.interval = setInterval(() => {
			this.socket.emit("updateFrame", {
				player: {
					x: this.tmpX,
					y: this.bottomPaddle.position.y,
					score: this.scores.myScore,
					width: this.paddleSize,
				},
				fieald: { height: 800, width: 600 },
				ball: {
					x: this.ball.position.x,
					y: this.ball.position.y,
					dx: this.ball.velocity.x,
					dy: this.ball.velocity.y,
					speed: 1,
					radius: 14,
					color: "",
				},
				opponent: {
					x: this.topPaddle.position.x,
					score: this.scores.opponentScore,
				},
				id_opponent: this.gameData.id_opponent,
				id_player: this.gameData.id_player,
			});
		}, 1000 / 60);
	}

	updateBallPosition(data: ball) {
		Matter.Body.setPosition(this.ball, {
			x: data.x,
			y: data.y,
		});
		this.ball.velocity.x = data.dx;
		this.ball.velocity.y = data.dy;
	}

	updateOpponentPosition(data: opponent) {
		Matter.Body.setPosition(this.topPaddle, {
			x: data.x,
			y: this.topPaddle.position.y,
		});
		this.scores.opponentScore = data.score;
	}

	updatePlayerPosition(data: player) {
		Matter.Body.setPosition(this.bottomPaddle, {
			x: data.x,
			y: this.bottomPaddle.position.y,
		});
		this.scores.myScore = data.score;
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
					this.tmpX = this.mouse.position.x;
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
	}
}
