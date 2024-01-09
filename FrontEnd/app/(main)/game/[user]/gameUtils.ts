import Matter from "matter-js";
export const myRender = (
	container: any,
	engine: any,
	width: number,
	height: number,
	background: string
) => {
	return Matter.Render.create({
		element: container,
		engine: engine,
		options: {
			width: width,
			height: height,
			wireframes: false,
			background: background,
			chamfer: { radius: 60 },
		},
	});
};

const wallThickness = 10;

export const getTopWall = (width: number, Bodies: any, wallOptions: object) => {
	return Bodies.rectangle(
		width / 2,
		wallThickness / 2,
		width + 2,
		wallThickness,
		wallOptions
	);
};

export const getBottomWall = (
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

export const getLeftWall = (
	height: number,
	Bodies: any,
	wallOptions: object
) => {
	return Bodies.rectangle(
		wallThickness / 2,
		height / 2,
		wallThickness,
		height,
		wallOptions
	);
};

export const getRightWall = (
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

export const getTopPaddle = (
	width: number,
	wallOptions: object,
	paddleSize: number
) => {
	return Matter.Bodies.rectangle(
		width / 2,
		paddleThikness * 2,
		paddleSize,
		paddleThikness,
		wallOptions
	);
};

export const getBottomPaddle = (
	width: number,
	height: number,
	wallOptions: object,
	paddleSize: number
) => {
	return Matter.Bodies.rectangle(
		width / 2,
		height - paddleThikness * 2,
		paddleSize,
		paddleThikness,
		wallOptions
	);
};

export const getBall = (width: number, height: number, wallOptions: object) => {
	return Matter.Bodies.circle(width / 2, height / 2, 14, wallOptions);
};

const changePosition = (topWall, Body) => {
	Body.setPosition(topWall, { x: 300, y: 300 });
};
