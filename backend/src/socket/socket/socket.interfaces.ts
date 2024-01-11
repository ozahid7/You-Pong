export enum map {
  GREEN,
  CLASSIC,
  ORANGE,
}

export enum mode {
  HARD,
  EASY,
}

export interface gameData {
  player: {
    x: number;
    y: number;
    width: number;
  };
  opponent: {
    x: number;
    y: number;
    width: number;
  };
  data: {
    id_match: string;
    id_player: string;
    socket_player: string;
    socket_opponent: string;
    id_opponent: string;
    map: map;
    mode: mode;
  };
  scores: {
    player: number;
    opponent: number;
  };
  ball: {
    x: number;
    y: number;
    speed: number;
    radius: number;
    dx: number;
    dy: number;
  };
  fieald: {
    width: number;
    height: number;
  };
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
