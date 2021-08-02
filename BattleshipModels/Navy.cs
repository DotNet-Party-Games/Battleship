using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    public enum Guess
    {
        Unknown,        // Unknown is first so it is the default value
        Hit,            // A ship has been hit
        Miss,           // A miss
        Ship,           // A ship segment that has not been hit
        DestroyedShip,  // A ship segment that is a part of a ship that has been destroyed
        Water           // A space that is not a ship and has not been guessed
    }

    /// <summary>
    /// Contains all of the information 1 user should know
    /// </summary>
    public class Navy
    {
        public int OceanSize { get; set; }          // The size of the board
        public List<Ship> Ships { get; set; }       // The list of Ships in the navy
        public Guess[,] Ocean { get; set; }         // Guess array of every value in the player's ocean
        public Guess[,] EnemyOcean { get; set; }    // Guess array of every value in the player's enemy's ocean
        public bool DestroyedNavy { get; set; }     // True if all ships in the navy are destroyed

        /// <summary>
        /// Creates a list of 5 ships and creates an ocean of sizeXsize
        /// </summary>
        /// <param name="p_oceanSize">The size of the ocean</param>
        public Navy(int p_oceanSize)
        {
            OceanSize = p_oceanSize;
            Ships = new List<Ship>()
            {
                new Ship(5),
                new Ship(4),
                new Ship(3),
                new Ship(3),
                new Ship(2)
            };
            Ocean = new Guess[OceanSize, OceanSize];
            for (int y = 0; y < OceanSize; y++)
            {
                for (int x = 0; x < OceanSize; x++)
                {
                    Ocean[x, y] = Guess.Water;
                }
            }
            EnemyOcean = new Guess[OceanSize, OceanSize];
            DestroyedNavy = false;
        }

        /// <summary>
        /// Checks to see if a ship can be placed on the board,
        /// and places the ship if it can fit on the board.
        /// </summary>
        /// <param name="p_ship">The Ship to be places</param>
        /// <param name="p_position">The position the head of the ship is being placed at</param>
        /// <param name="p_orientation">The orientation of the ship</param>
        /// <returns>True if the ship was placed on the board</returns>
        public bool PlaceShip(Ship p_ship, Position p_position, Orientation p_orientation)
        {
            if (CanShipFit(p_position, p_orientation, p_ship.Size))
            {
                p_ship.PositionHead = p_position;
                p_ship.Orientation = p_orientation;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Finalizes the players board and deploys the ships
        /// </summary>
        public void DeployShips()
        {
            foreach (Ship ship in Ships)
            {
                ship.DeployShip();
                foreach (Position position in ship.Positions)
                {
                    Ocean[position.XCoordinate, position.YCoordinate] = Guess.Ship;
                }
            }
        }

        /// <summary>
        /// Determines whether an attack at a position was a Hit or a Miss
        /// </summary>
        /// <param name="position">The position of the attack</param>
        /// <returns>The Guess value of the square that was attacked</returns>
        public Guess IncomingAttack(Position position)
        {
            Guess attacked = Ocean[position.XCoordinate, position.YCoordinate];
            Guess returnValue = attacked;
            if (attacked == Guess.Water)
            {
                returnValue = Guess.Miss;
            }
            else if (attacked == Guess.Ship)
            {
                if (ShipWasHit(position))
                {
                    returnValue = Guess.DestroyedShip;
                }
                else
                {
                    returnValue = Guess.Hit;
                }
            }
            Ocean[position.XCoordinate, position.YCoordinate] = returnValue;
            return returnValue;
        }

        /// <summary>
        /// Updates the Enemy board to reflect an attack
        /// </summary>
        /// <param name="p_position">The position of the attack</param>
        /// <param name="p_attack">The result of the attack</param>
        public void OutgoingAttack(Position p_position, Guess p_attack)
        {
            EnemyOcean[p_position.XCoordinate, p_position.YCoordinate] = p_attack;
        }

        /// <summary>
        /// Damages a ship that was hit at Position and checks to see if the ship was destroyed.
        /// Also changes the Guess values of the ship on the Ocean to Guess.DestroyedShip
        /// </summary>
        /// <param name="position">The position of the hit ship segment</param>
        /// <returns>True if the ship was destroyed</returns>
        public bool ShipWasHit(Position position)
        {
            bool shipStatus = false;
            foreach (Ship ship in Ships)
            {
                if (ship.HitShip(position))
                {
                    shipStatus = ship.ShipDestroyed();
                    if (shipStatus)
                    {
                        foreach (Position pos in ship.Positions)
                        {
                            Ocean[pos.XCoordinate, pos.YCoordinate] = Guess.DestroyedShip;
                        }
                        NavyDestroyed();
                    }
                    return shipStatus;
                }
            }
            return shipStatus;
        }

        /// <summary>
        /// Determines whether every ship has been destroyed
        /// </summary>
        /// <returns>True if every ship in the navy has been destroyed</returns>
        public bool NavyDestroyed()
        {
            foreach (Ship ship in Ships)
            {
                if (!ship.Destroyed)
                {
                    return false;
                }
            }
            DestroyedNavy = true;
            return true;
        }

        /// <summary>
        /// Checks to see if a ship being placed can fit on the board
        /// </summary>
        /// <param name="p_startingPosition">The Position of the first segment of the ship</param>
        /// <param name="p_orientation">The Orientation of the ship</param>
        /// <param name="p_shipSize">The Size of the ship</param>
        /// <returns>True if the ship can fit on the board.</returns>
        public bool CanShipFit(Position p_startingPosition, Orientation p_orientation, int p_shipSize)
        {
            bool fit = false;
            if (p_startingPosition.XCoordinate >= OceanSize || p_startingPosition.YCoordinate >= OceanSize)
            {
                fit = false;
            }
            else if (p_orientation == Orientation.Horizontal && p_startingPosition.XCoordinate < OceanSize - p_shipSize)
            {
                fit = true;
            }
            else if (p_orientation == Orientation.Vertical && p_startingPosition.YCoordinate < OceanSize - p_shipSize)
            {
                fit = true;
            }
            return fit;
        }
    }
}
