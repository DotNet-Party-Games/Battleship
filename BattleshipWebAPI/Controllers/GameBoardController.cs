using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleshipModels;
using BattleshipBL;

namespace BattleshipWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameBoardController : Controller
    {
        private static IGameRooms _gameRooms = new GameRooms();

        public GameBoardController()
        {

        }

        /// <summary>
        /// Gets the GameBoard of the room that corresponds to roomNumber
        /// </summary>
        /// <param name="roomNumber">The number of the Game room</param>
        /// <returns>An Ok 200 response with the GameBoard as the body</returns>
        [HttpGet("get")]
        public IActionResult GetGameBoard(int roomNumber)
        {
            return Ok(_gameRooms.GetGameRoom(roomNumber).GameBoard);
        }

        [HttpGet("reset")]
        public IActionResult Reset(int roomNumber)
        {
            return Ok(_gameRooms.ResetGameRoom(roomNumber).GameBoard);
        }

        /// <summary>
        /// Sets up a room's GameBoard to keep track of the users playing the game
        /// </summary>
        /// <param name="roomNumber">The number of the game room</param>
        /// <param name="user1Id">The Id of the first user</param>
        /// <param name="user2Id">The Id of the second user</param>
        /// <returns>An Ok 200 response with the GameBoard as the body</returns>
        [HttpPut("SetUp")]
        public IActionResult SetUp(int roomNumber, string user1Id, string user2Id)
        {
            _gameRooms.GetGameRoom(roomNumber).SetUp(user1Id, user2Id);
            return Ok(_gameRooms.GetGameRoom(roomNumber).GameBoard);
        }

        /// <summary>
        /// Places a ship in the user's navy
        /// </summary>
        /// <param name="roomNumber">The number of the game room</param>
        /// <param name="userId">The Id of the user placing the ship</param>
        /// <param name="shipId">The Id of the ship being placed</param>
        /// <param name="x">The X coordinate</param>
        /// <param name="y">The Y coordinate</param>
        /// <param name="z">The Z coordinate</param>
        /// <param name="horizontal">True if the ship is horizontal</param>
        /// <returns>An Ok 200 response with the GameBoard as the body</returns>
        [HttpPut("PlaceShip")]
        public IActionResult PlaceShip(int roomNumber, string userId, int shipId, int x, int y, int z, bool horizontal)
        {
            _gameRooms.GetGameRoom(roomNumber).PlaceShip(userId, shipId, x, y, z, horizontal);
            return Ok(_gameRooms.GetGameRoom(roomNumber).GameBoard);
        }

        /// <summary>
        /// Deploys a user's ships
        /// </summary>
        /// <param name="roomNumber">The number of the room</param>
        /// <param name="userId">The Id of the user</param>
        /// <returns>An Ok 200 response with the GameBoard as the body</returns>
        [HttpPut("DeployShips")]
        public IActionResult DeployShips(int roomNumber, string userId)
        {
            _gameRooms.GetGameRoom(roomNumber).DeployShips(userId);
            return Ok(_gameRooms.GetGameRoom(roomNumber).GameBoard);
        }

        /// <summary>
        /// Allows user to attack a space
        /// </summary>
        /// <param name="roomNumber">The number of the room</param>
        /// <param name="userId">The Id of the user</param>
        /// <param name="x">The X coordinate being attacked</param>
        /// <param name="y">The Y coordinate being attacked</param>
        /// <param name="z">The Z coordinate being attacked</param>
        /// <returns></returns>
        [HttpPut("Attack")]
        public IActionResult Attack(int roomNumber, string userId, int x, int y, int z)
        {
            _gameRooms.GetGameRoom(roomNumber).Attack(userId, x, y, z);
            return Ok(_gameRooms.GetGameRoom(roomNumber).GameBoard);
        }

    }
}
