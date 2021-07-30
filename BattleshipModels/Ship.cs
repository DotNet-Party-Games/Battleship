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

    // Values for the Ship's orientation
    public enum Orientation
    {
        Vertical,
        Horizontal
    }

    /// <summary>
    /// Keeps track of all the data of a single ship
    /// </summary>
    public class Ship
    {
        public int Size { get; set; }                           // The Size of the ship
        public List<ShipSegment> ShipCondition { get; set; }    // Keeps track of where the ship has been hit
        public bool Destroyed { get; set; }                     // Is True when all values in ShipCondition == ShipSegment.Damaged
        public Orientation Orientation { get; set; }            // The orientation of the ship
        public Position PositionHead { get; set; }              // The position of the first segment of the ship
        public List<Position> Positions { get; set; }           // A list that cooresponds a ship segment to a position

        /// <summary>
        /// Creates a new Ship that has p_size number of segments
        /// </summary>
        /// <param name="p_size">The number of segments that the ship has</param>
        public Ship(int p_size)
        {
            Size = p_size;
            Destroyed = false;
            ShipCondition = new List<ShipSegment>(Size);
            Positions = new List<Position>(Size);
            for (int i = 0; i < Size; i++)
            {
                ShipCondition[i] = ShipSegment.UnDamaged;
            }
        }

        /// <summary>
        /// Checks to see if an attack hit a ship.
        /// </summary>
        /// <param name="p_position">The position of the attack</param>
        /// <returns>True if the ship was hit</returns>
        public bool HitShip(Position p_position)
        {
            for (int i = 0; i < Positions.Count; i++)
            {
                if (Positions[i].XCoordinate == p_position.XCoordinate && Positions[i].YCoordinate == p_position.YCoordinate)
                {
                    ShipCondition[i] = ShipSegment.Damaged;
                    return true;
                }
            }
            return false;
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

        public void DeployShip()
        {
            if (Orientation == Orientation.Vertical)
            {
                for (int i = 0; i < Size; i++)
                {
                    Positions[i] = new Position(PositionHead.XCoordinate, PositionHead.YCoordinate + i, PositionHead.ZCoordinate);
                }
            }
            else if (Orientation == Orientation.Horizontal)
            {
                for (int i = 0; i < Size; i++)
                {
                    Positions[i] = new Position(PositionHead.XCoordinate + i, PositionHead.YCoordinate, PositionHead.ZCoordinate);
                }
            }
        }
    }
}
