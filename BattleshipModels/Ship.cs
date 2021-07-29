using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    // Values for whether a ship segment is damaged or not
    public enum ShipSegment
    {
        Damaged,
        UnDamaged
    }

    /// <summary>
    /// Keeps track of all the data of a single ship
    /// </summary>
    class Ship
    {
        // The Size of the ship
        public int Size { get; set; }

        // Keeps track of where the ship has been hit
        public List<ShipSegment> ShipCondition { get; set; }
        
        // Is True when all values in ShipCondition == ShipSegment.Damaged
        public bool Destroyed { get; set; }

        /// <summary>
        /// Creates a new Ship that has p_size number of segments
        /// </summary>
        /// <param name="p_size">The number of segments that the ship has</param>
        public Ship(int p_size)
        {
            Size = p_size;
            Destroyed = false;
            ShipCondition = new List<ShipSegment>(Size);
            for (int i = 0; i < Size; i++)
            {
                ShipCondition[i] = ShipSegment.UnDamaged;
            }
        }

        /// <summary>
        /// A method to determine if the ship has been sunk
        /// </summary>
        /// <returns>True if all values in ShipCondition are damaged</returns>
        public bool ShipDestroyed()
        {
            bool destroyed = true;
            foreach (ShipSegment segment in ShipCondition)
            {
                if (segment == ShipSegment.UnDamaged)
                {
                    destroyed = false;
                }
            }
            Destroyed = destroyed;
            return destroyed;
        }

        /// <summary>
        /// Damages a segment on the ship
        /// </summary>
        /// <param name="p_segmentNumber">The segment tp be damaged</param>
        public void DestroySegment(int p_segmentNumber)
        {
            ShipCondition[p_segmentNumber] = ShipSegment.Damaged;
        }
    }
}
