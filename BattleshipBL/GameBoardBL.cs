using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipBL
{
    class GameBoardBL : IGameBoardBL
    {
        private GameBoard _gameBoard;
        public GameBoardBL()
        {
            _gameBoard = new GameBoard(10);
        }
        public void SetUp(int User1Id, int User2Id)
        {
            // ToDo: Implement the users being the actual users
            _gameBoard.User1 = new User() { UserId = User1Id };
            _gameBoard.User2 = new User() { UserId = User2Id };
        }
        public bool Attack(int UserId, int x, int y, int z)
        {
            Position position = new Position(x, y, z);
            if (_gameBoard.User1.UserId == UserId)
            {
                _gameBoard.User1Attacks(position);
            }
            else
            {
                _gameBoard.User2Attacks(position);
            }
            return _gameBoard.IsWinner() != null;
        }

        public void DeployShips(int UserId)
        {
            if (_gameBoard.User1.UserId == UserId)
            {
                _gameBoard.User1Navy.DeployShips();
            }
            else
            {
                _gameBoard.User2Navy.DeployShips();
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
            if (_gameBoard.User1.UserId == UserId)
            {
                _gameBoard.User1Navy.PlaceShip(_gameBoard.User1Navy.Ships[shipId], position, orientation);
            }
            else
            {
                _gameBoard.User2Navy.PlaceShip(_gameBoard.User2Navy.Ships[shipId], position, orientation);
            }
        }
    }
}
