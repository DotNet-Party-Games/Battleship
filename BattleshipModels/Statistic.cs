using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    /// <summary>
    /// Keep track of the Wins/Losses/Ties of a user
    /// </summary>
    public class Statistic
    {
        // The Unique value for this stat
        [Key]
        public int StatId { get; set; }

        // The UserId of the User whose statistics are being tracked
        public int UserId { get; set; }

        // The number of wins the User has
        public int Wins { get; set; }

        // The number of losses the user has
        public int Losses { get; set; }

        // The number of ties the user has
        public int Ties { get; set; }


        /// <summary>
        /// Creates a new Statistic class for a new User
        /// </summary>
        public Statistic()
        {
            Wins = 0;
            Losses = 0;
            Ties = 0;
        }

        /// <summary>
        /// Creates a new Statistic class for a new User
        /// Might not need this one
        /// </summary>
        /// <param name="p_userId">The Id of the user</param>
        public Statistic(int p_userId)
        {
            UserId = p_userId;
            Wins = 0;
            Losses = 0;
            Ties = 0;
        }
    }
}
