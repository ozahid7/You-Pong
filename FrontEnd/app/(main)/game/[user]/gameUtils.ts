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

export const getTopWall = (
  width: number,
  Bodies: any,
  wallOptions: object,
  thicc: number
) => {
  return Bodies.rectangle(width / 2, thicc / 2, width + 2, thicc, wallOptions);
};

export const getBottomWall = (
  height: number,
  width: number,
  Bodies: any,
  wallOptions: object,
  thicc: number
) => {
  return Bodies.rectangle(width / 2, height, width, thicc * 2, wallOptions);
};

export const getLeftWall = (
  height: number,
  Bodies: any,
  wallOptions: object,
  thicc: number
) => {
  return Bodies.rectangle(thicc / 2, height / 2, thicc, height, wallOptions);
};

export const getRightWall = (
  height: number,
  width: number,
  Bodies: any,
  wallOptions: object,
  thicc: number
) => {
  return Bodies.rectangle(
    width - thicc / 2,
    height / 2,
    thicc,
    height,
    wallOptions
  );
};

export const getTopPaddle = (
  width: number,
  wallOptions: object,
  paddleSize: number,
  Thiccness: number,
  PaddleY: number
) => {
  return Matter.Bodies.rectangle(
    width / 2,
    PaddleY,
    paddleSize,
    Thiccness,
    wallOptions
  );
};

export const getBottomPaddle = (
  width: number,
  height: number,
  wallOptions: object,
  paddleSize: number,
  Thiccness: number,
  PaddleY: number
) => {
  return Matter.Bodies.rectangle(
    width / 2,
    height - PaddleY,
    paddleSize,
    Thiccness,
    wallOptions
  );
};

export const getBall = (
  width: number,
  height: number,
  scale: number,
  wallOptions: object
) => {
  return Matter.Bodies.circle(width / 2, height / 2, scale * 15, wallOptions);
};
