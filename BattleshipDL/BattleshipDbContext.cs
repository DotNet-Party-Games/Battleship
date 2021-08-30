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
            p_options.UseSqlServer(@"Server=tcp:revbox.database.windows.net,1433;Initial Catalog=BattleShipDB;Persist Security Info=False;User ID=revbox;Password=R3vb0xP@55;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        protected override void OnModelCreating(ModelBuilder p_modelBuilder)
        {
            p_modelBuilder.Entity<Statistic>().HasKey(stat => stat.UserId);
        }
    }
}