export enum map {
  GREEN,
  CLASSIC,
  ORANGE,
}

export enum mode {
  HARD,
  EASY,
}

// export interface infoRequest {
//   id_game: string;
//   id_sender: string;
//   id_receiver: string;
//   socket_player: string;
//   map: map;
//   mode: mode;
// }

export interface infoType {
  id_channel: string;
  id_sender: string;
  content: string;
  created_at: Date;
}

export interface infoGame {
  id_game: string;
  id_sender: string;
  id_receiver: string;
  socket_player: string;
  map: map;
  mode: mode;
}

export interface infoPlayer {
  id_sender: string;
  is_public: boolean;
  map: map;
  mode: mode;
}
