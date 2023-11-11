"use client";
import React, { useEffect, useRef } from "react";
import { MyContainer } from "@/components";
import Matter from "matter-js";

const shutTheFuckUp = true;

export default function game() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const paddleRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let WIDTH: number = sceneRef.current!.clientWidth;
      let HEIGHT: number = sceneRef.current!.clientHeight;
      // Your client-side code here

      // console.log(sceneRef.current?.clientHeight, HEIGHT);
      var Engine = Matter.Engine,
        Render = Matter.Render,
        Bodies = Matter.Bodies,
        World = Matter.World,
        MouseCons = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Runner = Matter.Runner,
        Composite = Matter.Composite;

      var engine = Engine.create({
        gravity: {
          x: 0,
          y: 0
        }
      });

      var render = Render.create({
        element: sceneRef.current!,
        engine: engine,
        options: {
          width: WIDTH,
          height: HEIGHT,
          background: "#000000",
          wireframes: false,
        },
      });

      var ball = Bodies.circle(WIDTH / 2, HEIGHT / 2, 12, {
        friction: 0,
        restitution: 1,
        inertia: Infinity,
        density: 0.071,
        frictionAir: 0,
        mass: 15,
        force: {
          x: 0.3,
          y: 0.3
        },
        render: {
          fillStyle: "white",
          strokeStyle: "white",
          lineWidth: 3,
        },
      });

      var topBar = Bodies.rectangle(0, 0, WIDTH * 2, 10, {
        render: {
          fillStyle: "white",
        },
        isStatic: true,
      });

      var downBar = Bodies.rectangle(0, HEIGHT, WIDTH * 2, 10, {
        render: {
          fillStyle: "white",
        },
        isStatic: true,
      });

      var leftBar = Bodies.rectangle(0, HEIGHT, 10, HEIGHT * 2, {
        render: {
          fillStyle: "white",
        },
        isStatic: true,
      });

      var rightBar = Bodies.rectangle(WIDTH, HEIGHT, 10, HEIGHT * 2, {
        render: {
          fillStyle: "white",
        },
        isStatic: true,
      });

      var paddleRef = Bodies.rectangle(450, 50, 160, 10, {
        render: {
          fillStyle: "white",
          strokeStyle: "white",
        },
        isStatic: true,
      });
      var paddle2 = Bodies.rectangle(450, 900, 160, 10, {
        render: {
          fillStyle: "white",
          strokeStyle: "white",
        },
        isStatic: true,
      });

      var mouse = Mouse.create(sceneRef.current!);
      var options = {
        mouse: mouse,
        constraint: {
          stiffness: 0.2, // Adjust the stiffness to control how fast the paddle follows the mouse
        },
      };

      var mouseCons = MouseCons.create(engine, options);

      // document.addEventListener('mousemove', (event) => {
      //   if (paddleRef) {
      //     Composite.translate(paddleRef., { x: event.clientX - paddleRef.position.x, y: 0 });
      //   }
      // });

      World.add(engine.world, [
        ball,
        paddleRef,
        paddle2,
        topBar,
        downBar,
        leftBar,
        rightBar,
        mouseCons,
      ]);

      // setTimeout(() => {
      //   Matter.Body.applyForce(ball,ball.position ,{
      //     x: 0.005,
      //     y: 0.005
      //   });
      // }, 2000);

      var runner = Runner.create();
      Runner.run(runner, engine);

      render.mouse = mouse;

      Render.run(render);

      return () => {
        Render.stop(render);
        Runner.stop(runner);
      };
    }
  }, []);
  return (
    <div className="flex w-full h-[90%] justify-center items-center debug">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer closeModal={() => shutTheFuckUp}>
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full h-[8%]"></div>
            <div
              ref={sceneRef}
              className="flex w-full h-full"
            ></div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
