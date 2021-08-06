using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleshipModels;

namespace BattleshipWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameBoardController : Controller
    {
        private GameBoard _gameBoard;

        public GameBoardController()
        {
            _gameBoard = new GameBoard(10);
        }

        [HttpGet("get")]
        public IActionResult GetGameBoard()
        {
            return Ok(_gameBoard);
        }

        [HttpPut]
        public IActionResult PlaceShip(int shipId, )
    }
}
