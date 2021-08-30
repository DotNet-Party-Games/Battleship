using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BattleshipDL
{
    public class BattleshipDbContext : DbContext
    {
        public BattleshipDbContext() : base() { }
        public BattleshipDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Statistic> Statistics { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder p_options)
        {
            //
        }

        protected override void OnModelCreating(ModelBuilder p_modelBuilder)
        {
            p_modelBuilder.Entity<Statistic>().HasKey(stat => stat.UserId);
        }
    }
}