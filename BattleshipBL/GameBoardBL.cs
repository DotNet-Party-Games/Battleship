using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipBL
{
    public class GameRooms : IGameRooms
    {
        public Dictionary<int, IGameBoardBL> GameBoards { get; set ; }

        public GameRooms()
        {
            GameBoards = new Dictionary<int, IGameBoardBL>();
        }

        public IGameBoardBL GetGameRoom(int roomId)
        {
            IGameBoardBL gameRoom;
            try
            {
                gameRoom = GameBoards[roomId];
            }
            catch (KeyNotFoundException)
            {
                gameRoom = new GameBoardBL(new GameBoard(10));
                GameBoards.Add(roomId, gameRoom);
            }
            return gameRoom;
        }
        
        public IGameBoardBL ResetGameRoom(int roomId)
        {
            IGameBoardBL gameRoom;
            GameBoards.Remove(roomId);
            gameRoom = new GameBoardBL(new GameBoard(10));
            GameBoards.Add(roomId, gameRoom);
            return gameRoom;
        }
    }

    public class GameBoardBL : IGameBoardBL
    {
        public GameBoard GameBoard { get; set; }

        public GameBoardBL(GameBoard gameBoard)
        {
            GameBoard = gameBoard;
        }
        public void SetUp(int User1Id, int User2Id)
        {
            // ToDo: Implement the users being the actual users
            // Or just change the Users to be userIds
            GameBoard.User1 = new User() { UserId = User1Id };
            GameBoard.User2 = new User() { UserId = User2Id };
        }
        public bool Attack(int UserId, int x, int y, int z)
        {
            Position position = new Position(x, y, z);
            if (GameBoard.User1.UserId == UserId)
            {
                GameBoard.User1Attacks(position);
            }
            else
            {
                GameBoard.User2Attacks(position);
            }
            return GameBoard.IsWinner() != null;
        }

        public void DeployShips(int UserId)
        {
            if (GameBoard.User1.UserId == UserId)
            {
                GameBoard.User1Navy.DeployShips();
            }
            else if (GameBoard.User2.UserId == UserId)
            {
                GameBoard.User2Navy.DeployShips();
            }
        }

        public void PlaceShip(int UserId, int shipId, int x, int y, int z, bool horizontal)
        {
            Position position = new Position(x, y, z);
            Orientation orientation = Orientation.Vertical;
            if (horizontal)
            {
                orientation = Orientation.Horizontal;
            }
            try
            {
                if (GameBoard.User1.UserId == UserId)
                {
                    GameBoard.User1Navy.PlaceShip(GameBoard.User1Navy.Ships[shipId], position, orientation);
                }
                else
                {
                    GameBoard.User2Navy.PlaceShip(GameBoard.User2Navy.Ships[shipId], position, orientation);
                } 
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
