using Microsoft.EntityFrameworkCore;
using BattleshipDL;
using System;
using Xunit;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using BattleshipModels;

namespace BattleshipTest
{
    public class UserDLTest
    {
        private readonly DbContextOptions<BattleshipDbContext> _options;

        public UserDLTest()
        {
            _options = new DbContextOptionsBuilder<BattleshipDbContext>().UseSqlite("Filename = Test.db").Options;
            this.Seed();
        }

        [Fact]
        public async void AddUserShouldAddUser()
        {
            using (var context = new BattleshipDbContext(_options))
            {
                //Arrange
                IUserDL repo = new UserDL(context);
                User use = new User("Adam", "AdamPassword", "adam@adam.adam", false);

                //Act
                await repo.AddUserAsync(use);
                User check = await repo.GetUserAsync("Adam");

                //Assert
                Assert.NotNull(check);
                Assert.Equal(use, check);
            }
        }

        [Fact]
        public async void GetUserShouldIncludeScoreInfo()
        {
            using(var context = new BattleshipDbContext(_options))
            {
                //Arrange
                IUserDL repo = new UserDL(context);
                User use = new User();

                //Act
                use = await repo.GetUserAsync("Jacob");

                //Assert
                Assert.NotEmpty(use.Scores);
                Assert.Equal(2, use.Scores.Count);
            }
        }
        
        [Fact]
        public async void GetUserShouldIncludeStatsInfo()
        {
            using(var context = new BattleshipDbContext(_options))
            {
                //Arrange
                IUserDL repo = new UserDL(context);
                User use = new User();

                //Act
                use = await repo.GetUserAsync("Jacob");

                //Assert
                Assert.Equal(1, use.Stats.Wins);
            }
        }

        [Fact]
        public async void GetAllUsersShouldGetAllUsers()
        {
            using(var context = new BattleshipDbContext(_options))
            {
                //Arrange
                IUserDL repo = new UserDL(context);
                User use1 = new User();
                User use2 = new User();
                List<User> useList = new List<User>();

                //Act
                use1 = await repo.GetUserAsync("Jacob");
                use2 = await repo.GetUserAsync("Seth");
                useList = await repo.GetAllUsersAsync();

                //Assert
                Assert.Contains(use1, useList);
                Assert.Contains(use2, useList);
                Assert.Equal(2, useList.Count);
            }
        }

        [Fact]
        public async void UpdateUserShouldUpdateUser()
        {
            using (var context = new BattleshipDbContext(_options))
            {
                //Arrange
                IUserDL repo = new UserDL(context);
                User use = new User();
                User sameUse = new User();

                //Act
                use = await repo.GetUserAsync("Jacob");
                use.Email = "newJacob@jacob.jacob";
                use.Stats.Ties++;
                sameUse = use;
                await repo.UpdateUserAsync(use);
                use = await repo.GetUserAsync("Jacob");

                //Assert
                Assert.Equal(sameUse, use);
            }
        }

        private void Seed()
        {
            using (var context = new BattleshipDbContext(_options))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                context.Users.AddRange(
                    new User("Jacob", "JacobPassword", "jacob@jacob.jacob", false)
                    {
                        UserId = "Jacob",
                        Scores = new List<Score>
                        {
                            new Score("Jacob")
                            {
                                ScoreId = 1,
                                ScoreValue = 100
                            },
                            new Score("Jacob")
                            {
                                ScoreId = 2,
                                ScoreValue = 200
                            }
                        },
                        Stats = new Statistic
                        {
                            StatId = 1,
                            UserId = "Jacob",
                            Wins = 1,
                            Losses = 527,
                            Ties = 0
                        }
                    },
                    new User("Seth", "SethPassword", "seth@seth.seth", true)
                    {
                        UserId = "Seth",
                        Scores = new List<Score>
                        {
                            new Score("Seth")
                            {
                                ScoreId = 3,
                                ScoreValue = 300
                            }
                        },
                        Stats = new Statistic
                        {
                            StatId = 2,
                            UserId = "Seth",
                            Wins = 527,
                            Losses = 1,
                            Ties = 0
                        }
                    }
                );

                context.SaveChanges();
            }
        }
    }
}
