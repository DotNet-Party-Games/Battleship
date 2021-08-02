using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipTest
{
    public class BattleshipShipModelTest
    {
        [Fact]
        public void IsWinnerTest()
        {
            GameBoard game = new GameBoard(10);
            User user1 = new User("test", "test", "test", false);
            User user2 = new User("test", "test", "test", false);
            game.User1 = user1;
            game.User2 = user2;
            game.User2Navy.DestroyedNavy = true;
            Assert.True(game.IsWinner() == user1);
        }

        [Fact]
        public void TestCreateShip()
        {
            int shipSize = 5;
            Ship ship = new Ship(shipSize);
            Assert.False(ship.Destroyed);
            Assert.True(ship.Size == shipSize);
            Assert.True(ship.ShipCondition.Count == shipSize);
            Assert.True(ship.Positions.Count == shipSize);
        }

        [Fact]
        public void TestDeployShip()
        {
            Ship ship = new Ship(5);
            ship.PositionHead = new Position(0, 0, 0);
            ship.Orientation = Orientation.Horizontal;
            ship.DeployShip();
            for (int i = 0; i < ship.Positions.Count; i++)
            {
                Assert.True(ship.Positions[i].XCoordinate == i);
            }
            ship.Orientation = Orientation.Vertical;
            ship.DeployShip();
            for (int i = 0; i < ship.Positions.Count; i++)
            {
                Assert.True(ship.Positions[i].YCoordinate == i);
            }
        }

        [Fact]
        public void TestHitShip()
        {
            Ship ship = new Ship(5);
            ship.PositionHead = new Position(3, 3, 0);
            ship.Orientation = Orientation.Horizontal;
            ship.DeployShip();
            Assert.False(ship.HitShip(new Position(4, 4, 0)));
            Assert.True(ship.HitShip(new Position(3, 3, 0)));
            Assert.True(ship.HitShip(new Position(4, 3, 0)));
            Assert.True(ship.HitShip(new Position(5, 3, 0)));
            Assert.True(ship.HitShip(new Position(6, 3, 0)));
            Assert.True(ship.HitShip(new Position(7, 3, 0)));
            for (int i = 0; i < ship.ShipCondition.Count; i++)
            {
                Assert.True(ship.ShipCondition[i] == ShipSegment.Damaged);
            }
        }

        [Fact]
        public void TestShipDestroyed()
        {
            Ship ship = new Ship(5);
            Assert.False(ship.ShipDestroyed());
            for (int i = 0; i < ship.ShipCondition.Count; i++)
            {
                ship.ShipCondition[i] = ShipSegment.Damaged;
            }
            Assert.True(ship.ShipDestroyed());
        }

        [Fact]
        public void TestDestroySegment()
        {
            Ship ship = new Ship(5);
            Assert.False(ship.ShipCondition[3] == ShipSegment.Damaged);
            ship.DestroySegment(3);
            Assert.True(ship.ShipCondition[3] == ShipSegment.Damaged);
        }
    }
}
