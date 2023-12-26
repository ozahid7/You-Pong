import { Server } from "socket.io";

const io = new Server({
	cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", socket => {
	console.log(" some one has connected ! ", socket.id)
    socket.on('first_event', (number, string, obj ) => {
        console.log(number, string, obj)
    })
});

io.listen(5000);
