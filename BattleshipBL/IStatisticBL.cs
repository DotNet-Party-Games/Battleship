using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipBL
{
    /// <summary>
    /// Handles business logic for Statistic objects
    /// </summary>
    public interface IStatisticBL
    {
        /// <summary>
        /// Gets a statistic based on its id
        /// </summary>
        /// <param name="p_name">The Username tied to the statistic to get</param>
        /// <returns>Returns the statistic with a matching StatId</returns>
        Task<Statistic> GetStatisticAsync(string p_name);

        /// <summary>
        /// Returns all statistics
        /// </summary>
        /// <returns>Returns the statistics in List form</returns>
        Task<List<Statistic>> GetAllStatisticsAsync();

        /// <summary>
        /// Updates a statistic
        /// </summary>
        /// <param name="p_name">Username whose statistic will be altered</param>
        /// <param name="p_win">Win Condition, True if Won, False otherwise</param>
        /// <returns>Returns the statistic object passed in as a parameter</returns>
        Task<Statistic> UpdateStatisticAsync(string p_name, bool p_win);
    }
}
