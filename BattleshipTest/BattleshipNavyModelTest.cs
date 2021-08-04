using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipTest
{
    public class BattleshipNavyModelTest
    {
        public Navy TheNavy { get; set; }
        public int OceanSize { get; set; }
        public int Levels { get; set; }
        public BattleshipNavyModelTest()
        {
            OceanSize = 10;
            Levels = 2;
            TheNavy = new Navy(OceanSize);
            for (int i = 0; i < TheNavy.Ships.Count; i++)
            {
                TheNavy.PlaceShip(TheNavy.Ships[i],
                    new Position(0, i, 0), Orientation.Horizontal);
            }
        }

        [Fact]
        public void NavyConstructorTest()
        {
            Assert.True(TheNavy.OceanSize == OceanSize);
            Assert.True(TheNavy.Ships.Count == 5);
            Assert.True(TheNavy.Ocean.Length == OceanSize*OceanSize * Levels);
            Assert.True(TheNavy.EnemyOcean.Length == OceanSize*OceanSize * Levels);
            Assert.False(TheNavy.DestroyedNavy);
        }

        [Fact]
        public void CanShipFitTest()
        {
            Assert.False(TheNavy.CanShipFit(new Position(OceanSize, 0, 0), Orientation.Vertical, 5));
            Assert.False(TheNavy.CanShipFit(new Position(0, OceanSize, 0), Orientation.Horizontal, 5));
            Assert.False(TheNavy.CanShipFit(new Position(OceanSize - 2, 0, 0), Orientation.Horizontal, 5));
            Assert.False(TheNavy.CanShipFit(new Position(0, OceanSize - 2, 0), Orientation.Vertical, 5));
            Assert.True(TheNavy.CanShipFit(new Position(4, 0, 0), Orientation.Horizontal, 5));
            Assert.True(TheNavy.CanShipFit(new Position(0, 4, 0), Orientation.Vertical, 5));
        }

        [Fact]
        public void PlaceShipTest()
        {
            for (int i = 0; i < TheNavy.Ships.Count; i++)
            {
                Assert.False(TheNavy.PlaceShip(TheNavy.Ships[i],
                    new Position(0, OceanSize, 0), Orientation.Horizontal));
                Assert.True(TheNavy.PlaceShip(TheNavy.Ships[i],
                    new Position(0, i, 0), Orientation.Horizontal));
            }
        }

        [Fact]
        public void DeployShipsTest()
        {
            TheNavy.DeployShips();
            foreach (Ship ship in TheNavy.Ships)
            {
                foreach (Position position in ship.Positions)
                {
                    Assert.True(TheNavy.Ocean[position.XCoordinate, position.YCoordinate, position.ZCoordinate]
                        == Guess.Ship);
                }
            }
        }

        [Fact]
        public void IncomingAttackTest()
        {
            TheNavy.DeployShips();
            Position p1 = new Position(0, 4, 0);
            Position p2 = new Position(1, 4, 0);
            Position p3 = new Position(5, 0, 0);
            Assert.True(TheNavy.IncomingAttack(p1) == Guess.Hit);
            Assert.True(TheNavy.Ocean[p1.XCoordinate, p1.YCoordinate, p1.ZCoordinate] == Guess.Hit);
            Assert.True(TheNavy.IncomingAttack(p2) == Guess.DestroyedShip);
            Assert.True(TheNavy.Ocean[p1.XCoordinate, p1.YCoordinate, p1.ZCoordinate] == Guess.DestroyedShip);
            Assert.True(TheNavy.Ocean[p2.XCoordinate, p2.YCoordinate, p2.ZCoordinate] == Guess.DestroyedShip);
            Assert.True(TheNavy.IncomingAttack(p3) == Guess.Miss);
            Assert.True(TheNavy.Ocean[p3.XCoordinate, p3.YCoordinate, p3.ZCoordinate] == Guess.Miss);
        }

        [Fact]
        public void OutgoingAttackTest()
        {
            Assert.True(TheNavy.EnemyOcean[0, 0, 0] == Guess.Unknown);
            TheNavy.OutgoingAttack(new Position(0, 0, 0), Guess.Hit);
            Assert.True(TheNavy.EnemyOcean[0, 0, 0] == Guess.Hit);
        }

        [Fact]
        public void NavyDestroyedTest()
        {
            Assert.False(TheNavy.NavyDestroyed());
            Assert.False(TheNavy.DestroyedNavy);
            for (int i = 0; i < TheNavy.Ships.Count; i++)
            {
                TheNavy.Ships[i].Destroyed = true;
            }
            Assert.True(TheNavy.NavyDestroyed());
            Assert.True(TheNavy.DestroyedNavy);
        }
    }
}
