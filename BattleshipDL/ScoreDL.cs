using BattleshipModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipDL
{
    public class ScoreDL : IScoreDL
    {
        private BattleshipDbContext _context;

        public ScoreDL(BattleshipDbContext p_context)
        {
            _context = p_context;
        }

        public async Task<Score> AddScore(Score p_score)
        {
            _context.Scores.Add(p_score);
            await _context.SaveChangesAsync();
            return p_score;
        }

        public async Task<List<Score>> GetAllScores()
        {
            return await _context.Scores.Select(score => score).ToListAsync();
        }

        public async Task<Score> GetScore(int p_sId)
        {
            return await _context.Scores.FindAsync(p_sId);
        }

        public async Task<Score> UpdateScore(Score p_score)
        {
            _context.Scores.Update(p_score);
            await _context.SaveChangesAsync();
            return p_score;
        }
    }
}
