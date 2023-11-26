import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
@WebSocketGateway({namespace: 'userStatus'})
export class UserStatusGateway {

    @WebSocketServer()
    server: Server
    @SubscribeMessage('salam')
    function(@MessageBody() Body){

    }

    handleConnection(client: Socket) {
        client.handshake
    }
}