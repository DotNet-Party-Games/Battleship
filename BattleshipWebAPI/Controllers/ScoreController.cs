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
    public class ScoreController : ControllerBase
    {
        private IScoreBL _scoreBL;

        public ScoreController(IScoreBL p_scoreBL)
        {
            _scoreBL = p_scoreBL;
        }

        // GET: api/<ScoreController>/5
        [HttpGet("get/{p_sId}")]
        public async Task<IActionResult> GetScore(int p_sId)
        {
            return Ok(await _scoreBL.GetScoreAsync(p_sId));
        }

        // GET api/<ScoreController>/
        [HttpGet]
        public async Task<IActionResult> GetAllScores()
        {
            return Ok(await _scoreBL.GetAllScoresAsync());
        }

        // POST api/<ScoreController>
        [HttpPost("add")]
        public async Task<IActionResult> AddScore([FromBody] Score p_score)
        {
            return Created("api/[controller]/add", await _scoreBL.AddScoreAsync(p_score));
        }

        // PUT api/<ScoreController>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateScore([FromBody] Score p_score)
        {
            return Ok(await _scoreBL.UpdateScoreAsync(p_score));
        }
    }
}
