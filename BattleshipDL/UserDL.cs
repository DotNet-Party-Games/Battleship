using BattleshipModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipDL
{
    public class UserDL : IUserDL
    {
        private BattleshipDbContext _context;

        public UserDL(BattleshipDbContext p_context)
        {
            _context = p_context;
        }

        public async Task<User> AddUserAsync(User p_user)
        {
            _context.Add(p_user);
            await _context.SaveChangesAsync();
            return p_user;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.Select(user => user).ToListAsync();
        }

        public async Task<User> GetUserAsync(int p_uId)
        {
            return await _context.Users.FindAsync(p_uId);
        }

        public async Task<User> UpdateUserAsync(User p_user)
        {
            _context.Update(p_user);
            await _context.SaveChangesAsync();
            return p_user;
        }
    }
}
