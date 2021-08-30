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
        /// <param name="p_name">The Username tied to the statistic to get</param>
        /// <returns>Returns the statistic with a matching StatId</returns>
        Task<Statistic> GetStatisticAsync(string p_name);

        /// <summary>
        /// Returns all statistics in the database
        /// </summary>
        /// <returns>Returns the statistics in List form</returns>
        Task<List<Statistic>> GetAllStatisticsAsync();

        /// <summary>
        /// Updates a statistic in the database
        /// </summary>
        /// <param name="p_name">Username whose statistic will be altered</param>
        /// <param name="p_win">Win Condition, True if Won, False otherwise</param>
        /// <returns>Returns the statistic object passed in as a parameter</returns>
        Task<Statistic> UpdateStatisticAsync(string p_user, bool p_win);
    }
}
