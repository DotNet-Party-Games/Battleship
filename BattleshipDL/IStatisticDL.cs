using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipDL
{
    /// <summary>
    /// Handles data logic for Statistic objects
    /// </summary>
    public interface IStatisticDL
    {
        /// <summary>
        /// Gets a statistic based on its id
        /// </summary>
        /// <param name="p_sId">The StatId of the statistic to get</param>
        /// <returns>Returns the statistic with a matching StatId</returns>
        Task<Statistic> GetStatistic(int p_sId);

        /// <summary>
        /// Adds a new statistic to the database
        /// </summary>
        /// <param name="p_stat">The statistic object to be added</param>
        /// <returns>Returns the statistic object passed in as a parameter</returns>
        Task<Statistic> AddStatistic(Statistic p_stat);

        /// <summary>
        /// Returns all statistics in the database
        /// </summary>
        /// <returns>Returns the statistics in List form</returns>
        Task<List<Statistic>> GetAllStatistics();

        /// <summary>
        /// Updates a statistic in the database
        /// </summary>
        /// <param name="p_stat">The statistic to be updates, including changes</param>
        /// <returns>Returns the statistic object passed in as a parameter</returns>
        Task<Statistic> UpdateStatistic(Statistic p_stat);
    }
}
