using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BattleshipBL
{
    /// <summary>
    /// Handles the business logic for users, including password security.
    /// </summary>
    public interface IUserBL
    {
        /// <summary>
        /// Gets a user based on their UserId
        /// </summary>
        /// <param name="p_uId">the UserId of the user to be retrieved</param>
        /// <returns>Returns the user with a matching UserId</returns>
        Task<User> GetUserAsync(int p_uId);

        /// <summary>
        /// Adds a user
        /// </summary>
        /// <param name="p_user">The user object to be added</param>
        /// <returns>Returns the user object passed in as a parameter</returns>
        Task<User> AddUserAsync(User p_user);

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>Returns all users in List form</returns>
        Task<List<User>> GetAllUsersAsync();

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="p_user">The user to be updated, including changes</param>
        /// <returns>Returns the user object passed in as a parameter</returns>
        Task<User> UpdateUserAsync(User p_user);

        /// <summary>
        /// Computes a hash value for the user's credentials
        /// </summary>
        /// <param name="p_plainText">The user's password</param>
        /// <param name="p_salt">The password's salt. Can be left empty if generating a new password hash</param>
        /// <returns>Returns a computed hash value in string form</returns>
        Task<String> ComputeCredentialsHashAsync(string p_plainText, byte[] p_salt = null);

        /// <summary>
        /// Checks if a password matches a user's
        /// </summary>
        /// <param name="p_user">The user whose password should be checked</param>
        /// <param name="p_password">The password to check against</param>
        /// <returns>Returns True if the password matches, false if it does not</returns>
        Task<bool> VerifyUserCredentialsAsync(User p_user, string p_password);
    }
}
