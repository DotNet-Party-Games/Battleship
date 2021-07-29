using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    public enum Guess
    {
        Unknown, // Unknown is first so it is the default value
        Hit,
        Miss
    }

    /// <summary>
    /// Contains all of the information 1 user should know
    /// </summary>
    class Navy
    {
        // The list of Ships in the navy
        public List<Ship> Ships { get; set; }

        // Guess array of every value in the ocean
        public Guess[,] Ocean { get; set; }

        /// <summary>
        /// Creates a list of 5 ships and creates an ocean of sizeXsize
        /// </summary>
        /// <param name="p_oceanSize">The size of the ocean</param>
        public Navy(int p_oceanSize)
        {
            Ships = new List<Ship>()
            {
                new Ship(5),
                new Ship(4),
                new Ship(3),
                new Ship(3),
                new Ship(2)
            };
            Ocean = new Guess[p_oceanSize, p_oceanSize];
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
            return true;
        }
    }
}
