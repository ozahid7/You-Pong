import Matter from "matter-js";
import { addWorld, myRender } from "./gameUtils";

export const { Engine, Render, World, Bodies, Composite } = Matter;

export class Game {
	height: number;
	width: number;

	render: any;
	engine: any;

	constructor(height: number, width: number, container: any) {
		this.height = height;
		this.width = width;

		const { Engine, Render, World, Bodies, Composite } = Matter;
		this.engine = Engine.create();

		//set up the engine
		this.render = myRender(container, this.engine, width, height);

		//add the World with its bodies
		addWorld(this.engine, World, Bodies, height, width);

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
