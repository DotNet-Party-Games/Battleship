using BattleshipBL;
using BattleshipModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BattleshipWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBL _userBL;

        public UserController(IUserBL p_userBL)
        {
            _userBL = p_userBL;
        }

        // GET: api/<UserController>/5
        [HttpGet("get/{p_uId}")]
        public async Task<IActionResult> GetUser(int p_uId)
        {
            return Ok(await _userBL.GetUserAsync(p_uId));
        }

        //POST api/<UserController>
        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] User p_use)
        {
            return Created("api/User/add", await _userBL.AddUserAsync(p_use));
        }

        //GET api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userBL.GetAllUsersAsync());
        }

        //PUT api/<UserController>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] User p_use)
        {
            return Ok(await _userBL.UpdateUserAsync(p_use));
        }

        //GET api/<UserController>/5
        [HttpGet("validate/{p_uId}/{p_pass}")]
        public async Task<IActionResult> ValidateUserCredentials(int p_uId, string p_pass)
        {
            User use = await _userBL.GetUserAsync(p_uId);
            bool isValid = _userBL.VerifyUserCredentials(use.Password, p_pass);
            return Ok(isValid);
        }
    }
}
