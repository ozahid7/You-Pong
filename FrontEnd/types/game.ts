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
	id_match: string;
	level: number;
}

export interface infoPlayer {
	id_sender: string;
	map: string;
	mode: string;
}
