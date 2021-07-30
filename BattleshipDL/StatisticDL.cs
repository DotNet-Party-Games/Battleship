using BattleshipModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipDL
{
    public class StatisticDL : IStatisticDL
    {
        private BattleshipDbContext _context;

        public StatisticDL(BattleshipDbContext p_context)
        {
            _context = p_context;
        }

        public async Task<Statistic> AddStatistic(Statistic p_stat)
        {
            _context.Statistics.Add(p_stat);
            await _context.SaveChangesAsync();
            return p_stat;
        }

        public async Task<List<Statistic>> GetAllStatistics()
        {
            return await _context.Statistics.Select(stat => stat).ToListAsync();
        }

        public async Task<Statistic> GetStatistic(int p_sId)
        {
            return await _context.Statistics.FindAsync(p_sId);
        }

        public async Task<Statistic> UpdateStatistic(Statistic p_stat)
        {
            _context.Statistics.Update(p_stat);
            await _context.SaveChangesAsync();
            return p_stat;
        }
    }
}
