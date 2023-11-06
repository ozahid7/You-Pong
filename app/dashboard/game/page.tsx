"use client";
import { useEffect, useRef } from "react";
import { MyContainer, CustomButton } from "@/components";
import * as Matter from "matter-js";
import { HtmlContext } from "next/dist/server/future/route-modules/pages/vendored/contexts/entrypoints";

export default function game() {
  const BALL_SIZE = 20;
  const PLANK_WIDTH = 150;
  const PLANK_HEIGHT = 20;

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;

  const BALL_START_POINT_X = GAME_WIDTH / 2 - BALL_SIZE;
  const BALL_START_POINT_Y = GAME_HEIGHT / 2;
  const BORDER = 15;
  var in_goal = false;
  /////////////////////////////////////////////////////////////////////////////////////////////
  const gameRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  /////////////////////////////////////////////////////////////////////////////////////////////
  const ball = Matter.Bodies.circle(
    BALL_START_POINT_X,
    BALL_START_POINT_Y,
    BALL_SIZE,
    {
      inertia: 0,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      restitution: 1.05,
      label: "ball",
    }
  );
  /////////////////////////////////////////////////////////////////////////////////////////////
  const paddleTop = Matter.Bodies.rectangle(
    GAME_WIDTH / 2,
    35,
    PLANK_WIDTH,
    PLANK_HEIGHT,
    { isStatic: true, label: "plankOne" }
  );
  const paddleBot = Matter.Bodies.rectangle(
    GAME_WIDTH / 2,
    GAME_HEIGHT - 35,
    PLANK_WIDTH,
    PLANK_HEIGHT,
    { isStatic: true, label: "plankTwo" }
  );
  /////////////////////////////////////////////////////////////////////////////////////////////
  const top = Matter.Bodies.rectangle(GAME_WIDTH / 2, 10, GAME_WIDTH, BORDER, {
    isStatic: true,
    label: "topWall",
  });
  const bottom = Matter.Bodies.rectangle(
    GAME_WIDTH / 2,
    GAME_HEIGHT - 10,
    GAME_WIDTH,
    BORDER,
    { isStatic: true, label: "bottomWall" }
  );

  const left = Matter.Bodies.rectangle(
    10,
    GAME_HEIGHT / 2,
    BORDER,
    GAME_HEIGHT,
    {
      isStatic: true,
      label: "leftWall",
    }
  );

  const right = Matter.Bodies.rectangle(
    GAME_WIDTH - 10,
    GAME_HEIGHT / 2,
    BORDER,
    GAME_HEIGHT,
    {
      isStatic: true,
      label: "rightWall",
    }
  );
  /////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = Matter.Engine.create();
    }

    if (!renderRef.current) {
      renderRef.current = Matter.Render.create({
        element: gameRef.current!,
        engine: engineRef.current!,
      });
    } else {
      renderRef.current.element = gameRef.current!;
    }

    Matter.World.add(engineRef.current.world, [
      top,
      left,
      bottom,
      right,
      paddleTop,
      paddleBot,
      ball,
    ]);

    (function render() {
      const context = contextRef.current;

      if (context) {
        var bodies = Matter.Composite.allBodies(engineRef.current.world);
        window.requestAnimationFrame(render);

        context.fillStyle = "#fff";
        context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        context.beginPath();

        for (var i = 0; i < bodies.length; i += 1) {
          var vertices = bodies[i].vertices;

          context.moveTo(vertices[0].x, vertices[0].y);

          for (var j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
          }

          context.lineTo(vertices[0].x, vertices[0].y);
        }

        context.lineWidth = 1;
        context.strokeStyle = "#999";
        context.stroke();
      }
    })();
    // engineRef.current.gravity.y = 0;

    Matter.Engine.run(engineRef.current);
    Matter.Render.run(renderRef.current);
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%] ">
        <MyContainer>
          <div className="flex w-full h-full">
            <script>
              console.log("Hello World!")
            </script>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
