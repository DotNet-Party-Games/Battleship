using BattleshipModels;
using System.Collections.Generic;

namespace BattleshipBL
{
    /// <summary>
    /// Holds a dictionary of IGameBoardBL
    /// </summary>
    public interface IGameRooms
    {
        /// <summary>
        /// The Dictionary of IGameBoardBL
        /// </summary>
        public Dictionary<int, IGameBoardBL> GameBoards { get; set; }

        /// <summary>
        /// Gets the appropriate GameRoom from the Dictionary. If the roomId does not exist it will create a new entry
        /// </summary>
        /// <param name="roomId">The Id of the GameRoom</param>
        /// <returns>The GameBoardBL that corresponds to the roomId. If no entry matches the roomId creates a new entry with the roomId and 
        /// returns a new GameBoard</returns>
        public IGameBoardBL GetGameRoom(int roomId);

        /// <summary>
        /// Resets a GameRoom
        /// </summary>
        /// <param name="roomId">The id of the room to be reset</param>
        /// <returns>A new GameBoard matching the roomId given</returns>
        public IGameBoardBL ResetGameRoom(int roomId);
    }

    /// <summary>
    /// Handles the logic for running the game
    /// </summary>
    public interface IGameBoardBL
    {
        /// <summary>
        /// 
        /// </summary>
        public GameBoard GameBoard { get; set; }

        /// <summary>
        /// Sets up the users playing the game
        /// </summary>
        /// <param name="User1Id">The Id of the first user</param>
        /// <param name="User2Id">The Id of the second user</param>
        public void SetUp(string User1Id, string User2Id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="shipId"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="horizontal"></param>
        public void PlaceShip(string UserId, int shipId, int x, int y, int z, bool horizontal);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        public void DeployShips(string UserId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <returns></returns>
        public bool Attack(string UserId, int x, int y, int z);

    }
}
