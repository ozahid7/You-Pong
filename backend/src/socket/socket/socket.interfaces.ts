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
    map: string;
    mode: string;
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
    pause:number;
  };
  fieald: {
    width: number;
    height: number;
  };
}

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
  map: string;
  mode: string;
}

export interface infoPlayer {
  id_sender: string;
  is_public: boolean;
  map: string;
  mode: string;
}
