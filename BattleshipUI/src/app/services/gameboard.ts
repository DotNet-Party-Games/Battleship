export interface IGameboard{
    height: number;
    width: number;
    
}

export interface IGameAPI {
    user1Id: number;
    user2Id: number;
    user1Navy: INavy;
    user2Navy: INavy;
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
