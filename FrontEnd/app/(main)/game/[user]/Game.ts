import Matter from "matter-js";
import { addWorld, myRender } from "./gameUtils";

export const { Engine, Render, World, Bodies, Composite } = Matter;

export class Game {
	height: number;
	width: number;

	render: any;
	engine: any;

	constructor(container: HTMLDivElement, map: string) {
		this.height = container.clientHeight;
		this.width = container.clientWidth;
		let fillColor: string;
		let strokeColor: string;

		if (map === "orange") {
			fillColor = "#EB6440";
			strokeColor = "#EB6440";
		} else if (map === "green") {
			fillColor = "#497174";
			strokeColor = "#497174";
		} else {
			fillColor = "#000000";
			strokeColor = "#000000";
		}

		const wallOptions = {
			isStatic: true,
			render: {
				fillStyle: fillColor,
				strokeStyle: strokeColor,
			},
		};

		const { Engine, Render, World, Bodies, Composite } = Matter;
		this.engine = Engine.create();

		//set up the engine
		this.render = myRender(container, this.engine, this.width, this.height);

		//add the World with its bodies
		addWorld(
			this.engine,
			World,
			Bodies,
			this.height,
			this.width,
			wallOptions
		);

		// Start the engine
		Matter.Runner.run(this.engine);

		// Start the renderer
		Render.run(this.render);
	}

	destroy() {
		Render.stop(this.render);
		Engine.clear(this.engine);
	}
}
