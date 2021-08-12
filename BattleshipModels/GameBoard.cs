using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    /// <summary>
    /// Keeps track of where the ships are at
    /// </summary>
    public class Position
    {
        public int XCoordinate { get; set; }    // The X coordinate
        public int YCoordinate { get; set; }    // The Y coordinate
        public int ZCoordinate { get; set; }    // The Z coordinate

        public Position(int p_x, int p_y, int p_z)
        {
            XCoordinate = p_x;
            YCoordinate = p_y;
            ZCoordinate = p_z;
        }

        /// <summary>
        /// Determines whether the X,Y,Z values of two positions are equal
        /// </summary>
        /// <param name="lhs">The Position on the left hand side of the == operator</param>
        /// <param name="rhs">The Position on the right hand side of the == operator</param>
        /// <returns>True if the XYZ coordinates of both positions are equal</returns>
        public static bool operator ==(Position lhs, Position rhs)
        {
            if (lhs.XCoordinate == rhs.XCoordinate && lhs.YCoordinate == rhs.YCoordinate && lhs.ZCoordinate == rhs.ZCoordinate)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// The opposite of the == operator
        /// </summary>
        /// <param name="lhs">The Position on the left hand side of the == operator</param>
        /// <param name="rhs">The Position on the right hand side of the == operator</param>
        /// <returns>False if the XYZ coordinates of both positions are equal</returns>
        public static bool operator !=(Position lhs, Position rhs) => !(lhs == rhs);


        /// <summary>
        /// Determines whether an object is equal to the current Position.
        /// Just use == though
        /// </summary>
        /// <param name="obj">The object to be evaluated</param>
        /// <returns>True if the object is equal to the current object</returns>
        public override bool Equals(object obj)
        {
            return obj is Position position &&
                   XCoordinate == position.XCoordinate &&
                   YCoordinate == position.YCoordinate &&
                   ZCoordinate == position.ZCoordinate;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(XCoordinate, YCoordinate, ZCoordinate);
        }
    }

    /// <summary>
    /// Contains all of the information needed to play the game Battleship
    /// </summary>
    public class GameBoard
    {
        public User User1 { get; set; }         // User 1        
        public Navy User1Navy { get; set; }     // The Navy of User 1        
        public User User2 { get; set; }         // User 2        
        public Navy User2Navy { get; set; }     // The Navy of User 2
        public bool CurrentTurn { get; set; }   // If user 1 has the current turn
        public int WinnerId { get; set; }       // The Id of the winner

        /// <summary>
        /// Constructs the Gameboard
        /// </summary>
        /// <param name="p_boardSize">The size of the board</param>
        public GameBoard(int p_boardSize)
        {
            User1Navy = new Navy(p_boardSize);
            User2Navy = new Navy(p_boardSize);
            CurrentTurn = true;
            WinnerId = -1;
        }

        /// <summary>
        /// User 1 attacks a space on User 2's board
        /// </summary>
        /// <param name="p_position">The position of the attack</param>
        /// <returns>The result of the attack</returns>
        public Guess User1Attacks(Position p_position)
        {
            Guess result = User2Navy.IncomingAttack(p_position);
            User1Navy.OutgoingAttack(p_position, result);
            CurrentTurn = false;
            return result;
        }

        /// <summary>
        /// User 2 attacks a space on User 1's board
        /// </summary>
        /// <param name="p_position">The position of the attack</param>
        /// <returns>The result of the attack</returns>
        public Guess User2Attacks(Position p_position)
        {
            Guess result = User1Navy.IncomingAttack(p_position);
            User2Navy.OutgoingAttack(p_position, result);
            CurrentTurn = true;
            return result;
        }

        /// <summary>
        /// Decides if there is a winner.
        /// Returns null if there is no winner.
        /// </summary>
        /// <returns>The User that won the game. If no winner returns null</returns>
        public User IsWinner()
        {
            User winner = null;
            if (User1Navy.DestroyedNavy)
            {
                winner = User2;
                WinnerId = winner.UserId;
            }
            else if (User2Navy.DestroyedNavy)
            {
                winner = User1;
                WinnerId = winner.UserId;
            }
            return winner;
        }
    }
}
