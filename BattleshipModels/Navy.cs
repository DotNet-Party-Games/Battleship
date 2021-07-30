using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    public enum Guess
    {
        Unknown,    // Unknown is first so it is the default value
        Hit,        // A ship has been hit
        Miss,       // A miss
        Ship,       // A ship segment that has not been hit
        Water       // A space that is not a ship and has not been guessed
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

        public Guess IncomingAttack(Position position)
        {
            Guess returnValue;
            Guess attacked = Ocean[position.XCoordinate, position.YCoordinate];
            if (attacked == Guess.Water)
            {

            }
            return Guess.Miss;
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
            if (p_orientation == Orientation.Horizontal && p_startingPosition.XCoordinate < OceanSize - p_shipSize)
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
