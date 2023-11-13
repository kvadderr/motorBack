import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { SocketService } from './gateway/gateway.service'

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private socketService: SocketService,
    ) { }

    @WebSocketServer() public server: Server;
    private logger: Logger = new Logger('AppGateway');

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    afterInit(server: Server) {
        this.socketService.socket = server;
        let users = [];

        this.socketService.socket.on('connection', (socket) => {

            let userID = null

            socket.on('join', function (data) {
                console.log(data)
                console.log(data.userId)
                socket.join(data.userId);
                users.push(data.userId);
                userID = data.userId
            });

            socket.on('message', function (data) {
                console.log(data)
                socket.in(data.opponentId).emit('message', data);
            });


        })
    };
}

