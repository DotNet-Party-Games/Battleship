using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipTest
{
    public class BattleshipPositionModelTest
    {
        [Fact]
        public void PostionOperatorsTest()
        {
            Position p1 = new Position(0, 1, 2);
            Position p2 = new Position(2, 1, 0);
            Position p3 = new Position(0, 1, 2);
            Assert.True(p1 == p3);
            Assert.True(p1 != p2);
        }
        
        [Fact]
        public void PositionEqualsTest()
        {
            Position p1 = new Position(0, 1, 2);
            Position p2 = new Position(0, 1, 2);
            Assert.True(p1.Equals(p2));
            Assert.False(p1.Equals(null));
            Assert.False(p1.Equals(new Position(0,0,0)));
        }
    }

    public class BattleshipGameBoardModelTest
    {
        public GameBoard TheGame { get; set; }
        public BattleshipGameBoardModelTest()
        {
            TheGame = new GameBoard(10);
            for (int i = 0; i < TheGame.User1Navy.Ships.Count; i++)
            {
                TheGame.User1Navy.PlaceShip(TheGame.User1Navy.Ships[i],
                    new Position(0, i, 0), Orientation.Horizontal);
            }
            for (int i = 0; i < TheGame.User2Navy.Ships.Count; i++)
            {
                TheGame.User2Navy.PlaceShip(TheGame.User2Navy.Ships[i],
                    new Position(0, i, 0), Orientation.Horizontal);
            }
            TheGame.User1Navy.DeployShips();
            TheGame.User2Navy.DeployShips();
        }

        [Fact]
        public void User1AttacksTest()
        {
            Assert.True(TheGame.User1Attacks(new Position(0, 0, 0)) == Guess.Hit);
            Assert.True(TheGame.User1Attacks(new Position(6, 6, 0)) == Guess.Miss);
        }

        [Fact]
        public void User2AttacksTest()
        {
            Assert.True(TheGame.User2Attacks(new Position(0, 0, 0)) == Guess.Hit);
            Assert.True(TheGame.User2Attacks(new Position(6, 6, 0)) == Guess.Miss);
        }

        [Fact]
        public void IsWinnerTest()
        {
            User user1 = new User("test", "test", "test", false);
            User user2 = new User("test", "test", "test", false);
            TheGame.User1 = user1;
            TheGame.User2 = user2;
            Assert.True(TheGame.IsWinner() == null);
            TheGame.User2Navy.DestroyedNavy = true;
            Assert.True(TheGame.IsWinner() == user1);
        }

    }
}
