using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipModels
{
    /// <summary>
    /// Keeps track of the score of a user
    /// </summary>
    public class Score
    {
        // The unique identifier for this Score
        public int ScoreId { get; set; }

        // The UserId of the User this score corresponds to
        public string UserId { get; set; }

        // The value of the score
        public int ScoreValue { get; set; }

        // The time this score was made
        public DateTime GameTime { get; set; }

        // The User this Score belongs to
        // Marked virtual so the database does not create a column for it
        public virtual User Scorer { get; set; }

        public Score()
        {
            ScoreValue = 0;
            GameTime = DateTime.UtcNow;
        }

        /// <summary>
        /// Creates a new Score Class and sets GameTime to UtcNow
        /// </summary>
        /// <param name="p_userId">The UserId of the user this score corresponds to</param>
        public Score(string p_userId)
        {
            UserId = p_userId;
            ScoreValue = 0;
            GameTime = DateTime.UtcNow;
        }

        /// <summary>
        /// ToDo: Implement This
        /// Calculates the score and sets the ScoreValue to the score
        /// </summary>
        public void SetScore()
        {
            // {Score Calculation}
            // ScoreValue = calculatedScore;
            throw new NotImplementedException();
        }
    }
}
