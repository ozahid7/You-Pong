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

const wallOptions = {
	isStatic: true,
	render: {
		fillStyle: "#EB6440",
		strokeStyle: "#EB6440",
	},
};

const wallThickness = 10;

const getTopWall = (width: number, Bodies: any) => {
	return Bodies.rectangle(
		width / 2,
		wallThickness / 2,
		width + 2,
		wallThickness,
		wallOptions
	);
};

const getBottomWall = (height: number, width: number, Bodies: any) => {
	return Bodies.rectangle(
		width / 2,
		height,
		width,
		wallThickness * 2,
		wallOptions
	);
};

const getLeftWall = (height: number, Bodies: any) => {
	return Bodies.rectangle(
		wallThickness / 2,
		height / 2,
		wallThickness,
		height,
		wallOptions
	);
};

const getRightWall = (height: number, width: number, Bodies: any) => {
	return Bodies.rectangle(
		width - wallThickness / 2,
		height / 2,
		wallThickness,
		height,
		wallOptions
	);
};

const paddleThikness = 15;

const getTopPaddle = (width: number) => {
	return Bodies.rectangle(
		width / 2,
		paddleThikness * 2,
		width / 4,
		paddleThikness,
		wallOptions
	);
};

const getBottomPaddle = (width: number, height: number) => {
	return Bodies.rectangle(
		width / 2,
		height - paddleThikness * 2,
		width / 4,
		paddleThikness,
		wallOptions
	);
};

const getBall = (width: number, height: number) => {
	return Bodies.circle(width / 2, height / 2, 14, wallOptions);
};

export const addWorld = (
	engine: any,
	World: any,
	Bodies: any,
	height: number,
	width: number
) => {
	const topWall = getTopWall(width, Bodies);
	const bottomWall = getBottomWall(height, width, Bodies);
	const leftWall = getLeftWall(height, Bodies);
	const rightWall = getRightWall(height, width, Bodies);
	const topPaddle = getTopPaddle(width);
	const bottomPaddle = getBottomPaddle(width, height);
	const ball = getBall(width, height);
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
