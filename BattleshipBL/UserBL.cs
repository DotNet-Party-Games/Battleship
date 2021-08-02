using BattleshipDL;
using BattleshipModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipBL
{
    public class UserBL : IUserBL
    {
        private IUserDL _repo;

        public UserBL(IUserDL p_repo)
        {
            _repo = p_repo;
        }

        public async Task<User> AddUserAsync(User p_user)
        {
            p_user.Password = ComputeCredentialsHash(p_user.Password);
            return await _repo.AddUserAsync(p_user);
            
        }

        public string ComputeCredentialsHash(string p_plainText, byte[] p_salt = null)
        {
            //Generate new salt if being used to create new user
            if(p_salt == null)
            {
                Random rng = new Random();
                int saltSize = rng.Next(64, 128);

                p_salt = new byte[saltSize];

                //A random number generator for more cryptographically secure values
                RNGCryptoServiceProvider srng = new RNGCryptoServiceProvider();

                srng.GetNonZeroBytes(p_salt);
            }

            //Merge the plaintext and salt into one array
            byte[] plainText = Encoding.UTF8.GetBytes(p_plainText);

            byte[] plainTextWithSalt = new byte[plainText.Length + p_salt.Length];

            for(int i = 0; i < plainText.Length; i++)
            {
                plainTextWithSalt[i] = plainText[i];
            }

            for(int i = 0; i < p_salt.Length; i++)
            {
                plainTextWithSalt[plainText.Length + 1] = p_salt[i];
            }

            //Compute the hash value of the plaintext+salt array
            HashAlgorithm hash = new SHA512Managed();

            byte[] hashBytes = hash.ComputeHash(plainTextWithSalt);


            //Merge the hash value and salt into a string
            byte[] hashWithSalt = new byte[hashBytes.Length + p_salt.Length];

            for(int i = 0; i < hashBytes.Length; i++)
            {
                hashWithSalt[i] = hashBytes[i];
            }

            for(int i = 0; i < p_salt.Length; i++)
            {
                hashWithSalt[hashBytes.Length + i] = p_salt[i];
            }

            string hashValue = Convert.ToBase64String(hashWithSalt);

            return hashValue;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _repo.GetAllUsersAsync();
        }

        public async Task<User> GetUserAsync(int p_uId)
        {
            return await _repo.GetUserAsync(p_uId);
        }

        public async Task<User> UpdateUserAsync(User p_user)
        {
            return await _repo.UpdateUserAsync(p_user);
        }

        public bool VerifyUserCredentials(string p_hash, string p_password)
        {
            byte[] hashWithSalt = Convert.FromBase64String(p_hash);
            
            //If the input hash is less than 64 bytes it's automatically invalid
            if(hashWithSalt.Length < 64)
            {
                return false;
            }

            //Copy salt value into new byte array
            byte[] salt = new byte[hashWithSalt.Length - 64];

            for(int i = 0; i < salt.Length; i++)
            {
                salt[i] = hashWithSalt[64 + i];
            }

            //Compute the hash value of p_password and compare it to the password hash
            string evalHashString = ComputeCredentialsHash(p_password, salt);

            return (p_hash == evalHashString);
        }
    }
}
