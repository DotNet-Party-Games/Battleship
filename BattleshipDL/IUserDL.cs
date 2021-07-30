using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipDL
{
    /// <summary>
    /// Handles Data Logic for User objects
    /// </summary>
    public interface IUserDL
    {
        /// <summary>
        /// Returns a user based on their UserId
        /// </summary>
        /// <param name="p_uId">The Id of the desired user</param>
        /// <returns>Returns the user as an object</returns>
        Task<User> GetUserAsync(int p_uId);

        /// <summary>
        /// Adds a new user to the database
        /// </summary>
        /// <param name="p_user">The user to be added</param>
        /// <returns>Returns the user that was passed in as a parameter</returns>
        Task<User> AddUserAsync(User p_user);

        /// <summary>
        /// Returns all users currently in the database
        /// </summary>
        /// <returns>Returns the users in a List</returns>
        Task<List<User>> GetAllUsersAsync();

        /// <summary>
        /// Updates a user in the database
        /// </summary>
        /// <param name="p_user">The user to be updated, including the updated data</param>
        /// <returns>Returns the user that was passeed in as a parameter</returns>
        Task<User> UpdateUserAsync(User p_user);

    }
}
