using BattleshipDL;
using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipBL
{
    public class StatisticBL : IStatisticBL
    {
        private IStatisticDL _repo;

        public StatisticBL(IStatisticDL p_repo)
        {
            _repo = p_repo;
        }

        public async Task<List<Statistic>> GetAllStatisticsAsync()
        {
            return await _repo.GetAllStatisticsAsync();
        }

        public async Task<Statistic> GetStatisticAsync(string p_name)
        {
            return await _repo.GetStatisticAsync(p_name);
        }

        public async Task<Statistic> UpdateStatisticAsync(string p_name, bool p_win)
        {
            return await _repo.UpdateStatisticAsync(p_name, p_win);
        }
    }
}
