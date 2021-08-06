using BattleshipModels;

namespace BattleshipBL
{
    /// <summary>
    /// Handles the logic for running the game
    /// </summary>
    public interface IGameBoardBL
    {
        /// <summary>
        /// Sets up the users playing the game
        /// </summary>
        /// <param name="User1Id">The Id of the first user</param>
        /// <param name="User2Id">The Id of the second user</param>
        public void SetUp(int User1Id, int User2Id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="shipId"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="horizontal"></param>
        public void PlaceShip(int UserId, int shipId, int x, int y, int z, bool horizontal);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        public void DeployShips(int UserId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <returns></returns>
        public bool Attack(int UserId, int x, int y, int z);

    }
}
