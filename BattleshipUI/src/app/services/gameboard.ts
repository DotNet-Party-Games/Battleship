export interface IGameboard{
    height: number;
    width: number;
    
}

export interface IGameAPI {
    user1: IUser;
    user2: IUser;
    user1Navy: INavy;
    user2Navy: INavy;
    currentTurn: boolean;
    winnerId: number;
}

export interface IUser {
    userId: number;
}

export interface INavy {
    ocean: number[][][];
    enemyOcean: number[][][];
    destroyedNavy: boolean;
}

export enum Tile{
    water,
    patrolboat
};
