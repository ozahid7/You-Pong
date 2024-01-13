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
      this.remap(this.paddleSize, 0, 600, 0, this.width),
      this.remap(15, 0, 800, 0, this.height),
      this.remap(45, 0, 800, 0, this.height)
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
      this.remap(this.paddleSize, 0, 600, 0, this.width),
      this.remap(15, 0, 800, 0, this.height),
      this.remap(45, 0, 800, 0, this.height)
    );

    //init walls
    this.walls.push(
      getTopWall(
        this.width,
        Bodies,
        wallOptions,
        this.remap(10, 0, 800, 0, this.height)
      )
    );
    this.walls.push(
      getBottomWall(
        this.height,
        this.width,
        Bodies,
        wallOptions,
        this.remap(10, 0, 800, 0, this.height)
      )
    );
    this.walls.push(
      getLeftWall(
        this.height,
        Bodies,
        wallOptions,
        this.remap(10, 0, 600, 0, this.width)
      )
    );
    this.walls.push(
      getRightWall(
        this.height,
        this.width,
        Bodies,
        wallOptions,
        this.remap(10, 0, 600, 0, this.width)
      )
    );

    //init ball
    this.ball = getBall(this.width, this.height, this.scale, wallOptions);

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
    setTimeout(() => {
      this.emitToUpdateFrame();
    }, 3000);
    this.setupMouseEvents();
  }

  remap(value: number, x1: number, y1: number, x2: number, y2: number): number {
    return ((value - x1) * (y2 - x2)) / (y1 - x1 + x2);
  }

  FixSizeRatio(): [number, number] {
    let width: number = 0;
    let height: number = 0;

    if (this.element.clientWidth > this.element.clientHeight) {
      height = this.element.clientHeight;
      width = height * (3 / 4);
    } else {
      width = this.element.clientWidth;
      height = width * (4 / 3);
      if (height > this.element.clientHeight) {
        height = this.element.clientHeight;
        width = height * (3 / 4);
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
      this.socket.emit("updateFrame", {
        paddleX: this.tmpX,
        id_match: this.gameData?.id_match,
      });
    }, 1000 / 60);
  }

  updateBallPosition(data: ball) {
    if (data)
      Matter.Body.setPosition(this.ball, {
        x: this.remap(data.x, 0, 600, 0, this.width), // **
        y: this.remap(data.y, 0, 800, 0, this.height), // normalizing dial size, bash t9ad f responsive
      });
  }

  updateOpponentPosition(data: opponent) {
    if (data) {
      if (data.x === 0) data.x = this.width / 2;

      Matter.Body.setPosition(this.topPaddle, {
        x: this.remap(data.x, 0, 600, this.width / 2, this.width),
        y: this.topPaddle.position.y,
      });
    }
  }

  updatePlayerPosition(data: player) {
    if (data) {
      console.log(
        "x:",
        this.remap(data.x, 0, 600, 0, this.width),
        "y:",
        this.bottomPaddle.position.y,
        "width:",
        this.width,
        "data:",
        data
      );
      if (data.x === 0) data.x = this.width / 2;
      Matter.Body.setPosition(this.bottomPaddle, {
        x: this.remap(data.x, 0, 600, 0, this.width),
        y: this.bottomPaddle.position.y,
      });
    }
  }

  setupMouseEvents() {
    let min: number = this.remap(this.paddleSize / 2, 0, 600, 0, this.width);
    let max: number = this.width - min;

    Matter.Events.on(
      this.mouseConstraint,
      "mousemove",
      (event: Matter.IMouseEvent) => {
        if (this.mouse.position.x <= max && this.mouse.position.x >= min) {
          this.tmpX = this.remap(this.mouse.position.x, 0, this.width, 0, 600);
        }
      }
    );
  }

  stopIntervall() {
    clearInterval(this.interval);
  }

  destroy() {
    this.render.canvas.remove();
    World.clear(this.engine.world, true);
    Render.stop(this.render);
    Engine.clear(this.engine);
    Events.off(this.engine, "mousemove");
  }
}
