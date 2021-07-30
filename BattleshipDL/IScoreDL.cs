using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipDL
{
    /// <summary>
    /// Handle data logic for Score objects.
    /// </summary>
    public interface IScoreDL
    {
        /// <summary>
        /// Gets a score from the database based on its Id
        /// </summary>
        /// <param name="p_sId">The ScoreId of the desired score</param>
        /// <returns>Returns the score with matching ScoreId</returns>
        Task<Score> GetScore(int p_sId);

        /// <summary>
        /// Adds a score to the database
        /// </summary>
        /// <param name="p_score">The score object to be added</param>
        /// <returns>Returns the score object passed in as a parameter</returns>
        Task<Score> AddScore(Score p_score);

        /// <summary>
        /// Gets all scores from the database
        /// </summary>
        /// <returns>Returns the scores as a List</returns>
        Task<List<Score>> GetAllScores();

        /// <summary>
        /// Updates a score in the database
        /// </summary>
        /// <param name="p_score">The score to be updated, including changes</param>
        /// <returns>Returns the score object passed in as a parameter</returns>
        Task<Score> UpdateScore(Score p_score);
    }
}
