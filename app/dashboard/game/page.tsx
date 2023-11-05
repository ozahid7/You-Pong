"use client";
import { useEffect, useRef } from "react";
import { MyContainer, CustomButton } from "@/components";
import * as Matter from "matter-js";

export default function game() {
  const gameRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = Matter.Engine.create();
    }

    if (!renderRef.current) {
      renderRef.current = Matter.Render.create({
        element: gameRef.current!,
        engine: engineRef.current!,
        // options: {
        //   width: 900,
        //   height: 1010,
        // }
      });
    } else {
      renderRef.current.element = gameRef.current!;
    }

    var ground = Matter.Bodies.rectangle(300, 600, 1000, 60, {
      isStatic: true,
    });
    var stack = Matter.Composites.stack(
      200,
      200,
      6,
      2.5,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 80, 80);
      }
    );
    var mouse = Matter.Mouse.create(renderRef.current.canvas);
    var mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: {
        render: { visible: true },
      },
    });

    renderRef.current.mouse = mouse;

    Matter.World.add(engineRef.current.world, [ground, mouseConstraint, stack]);
    Matter.Engine.run(engineRef.current);
    Matter.Render.run(renderRef.current);
  }, []);

  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%] debug">
        <MyContainer>
          <div
            className="flex w-full h-full justify-center items-center"
            ref={gameRef}
          ></div>
        </MyContainer>
      </div>
    </div>
  );
}
