using System;
using System.Collections.Generic;

namespace BattleshipModels
{
    /// <summary>
    /// A user that uses our application
    /// </summary>
    public class User
    {
        // The unique identifier for this user
        public int UserId { get; set; }

        // The Username of the user
        public string UserName { get; set; }

        // The Password of the user
        public string Password { get; set; }

        // The email of the user
        public string Email { get; set; }

        // The Date the user registered
        public DateTime RegisterDate { get; set; }

        // Whether or not the user is an admin
        public bool IsAdmin { get; set; }

        // A list of Scores the user has
        public List<Score> Scores { get; set; }

        // Game Statistics for the user
        public Statistic Stats { get; set; }

        public User()
        {
            UserName = "";
            Password = "";
            Email = "";
            RegisterDate = DateTime.UtcNow;
            IsAdmin = false;
            Scores = new List<Score>();
            Stats = new Statistic();
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="p_userName">The username of the user</param>
        /// <param name="p_password">The password of the user</param>
        /// <param name="p_email">The email of the user</param>
        /// <param name="p_isAdmin">Is the user an admin</param>
        public User(string p_userName, string p_password, string p_email, bool p_isAdmin)
        {
            UserName = p_userName;
            Password = p_password;
            Email = p_email;
            RegisterDate = DateTime.UtcNow;
            IsAdmin = p_isAdmin;
        }
    }
}
