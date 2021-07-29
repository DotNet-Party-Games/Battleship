using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    /// <summary>
    /// Contains all of the information needed to play the game Battleship
    /// </summary>
    class GameBoard
    {
        // User 1
        public User User1 { get; set; }
        // The Navy of User 1
        public Navy User1Navy { get; set; }

        // User 2
        public User User2 { get; set; }
        // The Navy of User 2
        public Navy User2Navy { get; set; }

        /// <summary>
        /// Constructs the Gameboard
        /// </summary>
        /// <param name="p_boardSize">The size of the board</param>
        public GameBoard(int p_boardSize)
        {
            User1Navy = new Navy(p_boardSize);
            User2Navy = new Navy(p_boardSize);
        }

        /// <summary>
        /// Decides if there is a winner.
        /// Returns null if there is no winner.
        /// </summary>
        /// <returns>The User that won the game. If no winner returns null</returns>
        public User IsWinner()
        {
            User winner = null;
            if (User1Navy.NavyDestroyed())
            {
                winner = User2;
            }
            else if (User2Navy.NavyDestroyed())
            {
                winner = User1;
            }
            return winner;
        }
    }
}
