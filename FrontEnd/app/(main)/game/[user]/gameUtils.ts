import { Bodies, Render } from "./Game";

export const myRender = (
	container: any,
	engine: any,
	width: number,
	height: number
) => {
	return Render.create({
		element: container,
		engine: engine,
		options: {
			width: width,
			height: height,
			wireframes: false,
			background: "white",
		},
	});
};

const wallThickness = 10;

const getTopWall = (width: number, Bodies: any, wallOptions: object) => {
	return Bodies.rectangle(
		width / 2,
		wallThickness / 2,
		width + 2,
		wallThickness,
		wallOptions
	);
};

const getBottomWall = (
	height: number,
	width: number,
	Bodies: any,
	wallOptions: object
) => {
	return Bodies.rectangle(
		width / 2,
		height,
		width,
		wallThickness * 2,
		wallOptions
	);
};

const getLeftWall = (height: number, Bodies: any, wallOptions: object) => {
	return Bodies.rectangle(
		wallThickness / 2,
		height / 2,
		wallThickness,
		height,
		wallOptions
	);
};

const getRightWall = (
	height: number,
	width: number,
	Bodies: any,
	wallOptions: object
) => {
	return Bodies.rectangle(
		width - wallThickness / 2,
		height / 2,
		wallThickness,
		height,
		wallOptions
	);
};

const paddleThikness = 15;

const getTopPaddle = (width: number, wallOptions: object) => {
	return Bodies.rectangle(
		width / 2,
		paddleThikness * 2,
		width / 4,
		paddleThikness,
		wallOptions
	);
};

const getBottomPaddle = (
	width: number,
	height: number,
	wallOptions: object
) => {
	return Bodies.rectangle(
		width / 2,
		height - paddleThikness * 2,
		width / 4,
		paddleThikness,
		wallOptions
	);
};

const getBall = (width: number, height: number, wallOptions: object) => {
	return Bodies.circle(width / 2, height / 2, 14, wallOptions);
};

export const addWorld = (
	engine: any,
	World: any,
	Bodies: any,
	height: number,
	width: number,
	wallOptions: object
) => {
	const topWall = getTopWall(width, Bodies, wallOptions);
	const bottomWall = getBottomWall(height, width, Bodies, wallOptions);
	const leftWall = getLeftWall(height, Bodies, wallOptions);
	const rightWall = getRightWall(height, width, Bodies, wallOptions);
	const topPaddle = getTopPaddle(width, wallOptions);
	const bottomPaddle = getBottomPaddle(width, height, wallOptions);
	const ball = getBall(width, height, wallOptions);
	World.add(engine.world, [
		topWall,
		bottomWall,
		leftWall,
		rightWall,
		topPaddle,
		bottomPaddle,
		ball,
	]);
};
