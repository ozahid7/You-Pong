export interface infoGame {
	id_game: string;
	id_sender: string;
	id_receiver: string;
	socket_player: string;
	map: string;
	mode: string;
}

export interface inviteReturn {
	info: infoGame;
	avatar: string;
	username: string;
}
