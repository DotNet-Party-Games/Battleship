using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleshipModels;
using Microsoft.EntityFrameworkCore;

namespace BattleshipDL
{
    public class BattleshipDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Statistic> Statistics { get; set; }

        public BattleshipDbContext() : base() { }
        public BattleshipDbContext(DbContextOptions options) : base(options) { }

        //Enter connection string and uncomment before making a database migration. Be sure to never commit this file with the connection string still here.

        //protected override void OnConfiguring(DbContextOptionsBuilder p_options)
        //{
        //    p_options.UseSqlServer(@"ConnectionStringHere");
        //}

        /// Generates Ids for the tables upon creating a new row, starting at 1
        protected override void OnModelCreating(ModelBuilder p_modelBuilder)
        {
            p_modelBuilder.Entity<User>()
                .Property(user => user.UserId)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<Score>()
                .Property(score => score.ScoreId)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<Statistic>()
                .Property(stat => stat.StatId)
                .ValueGeneratedOnAdd();
        }
    }
}
