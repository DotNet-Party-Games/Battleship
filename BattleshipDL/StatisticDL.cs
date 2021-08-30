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

        public async Task<List<Statistic>> GetAllStatisticsAsync()
        {
            return await _context.Statistics.Select(stat => stat).ToListAsync();
        }

        public async Task<Statistic> GetStatisticAsync(string p_name)
        {
            return await _context.Statistics.FindAsync(p_name);
        }

        public async Task<Statistic> UpdateStatisticAsync(string p_name, bool p_win)
        {
            Console.WriteLine("Finding " + p_name);
            Statistic p_stat = await _context.Statistics.FindAsync(p_name);
            Console.WriteLine("Found " + p_stat);
            if(p_stat == null)
            {
                p_stat = new Statistic(p_name);
                if(p_win)
                {
                    p_stat.Wins = p_stat.Wins + 1;
                } else {
                    p_stat.Losses = p_stat.Losses + 1;
                }
                _context.Statistics.Add(p_stat);
                Console.WriteLine("Adding " + p_stat.UserId + " " + p_stat.Wins + " " + p_stat.Losses);
            } else {
                if(p_win)
                {
                    p_stat.Wins = p_stat.Wins + 1;
                } else {
                    p_stat.Losses = p_stat.Losses + 1;
                }
                _context.Statistics.Update(p_stat);
                Console.WriteLine("Updating " + p_stat.UserId + " " + p_stat.Wins + " " + p_stat.Losses);
            }

            await _context.SaveChangesAsync();
            return p_stat;
            
        }
    }
}
