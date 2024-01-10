export class renderDto {
    ball: {
        x: number,
        y: number
        speed: number,
        radius: number,
        color: string,
        dx: number,
        dy: number
    };
    player: {
        x: number,
        y: number,
        score: number,
        width: number,
        height: number,
        color: string,
    };
    opponent: {
        x: number,
        y: number,
        score: number,
        width: number,
        height: number,
        color: string,
    };
    fieald: {
        width: number,
        height: number
    };
    id_match: string;
    id_player: string;
    id_opponent: string;
};
