using BattleshipBL;
using BattleshipModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleshipWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private IStatisticBL _statBL;

        public StatisticController(IStatisticBL p_statBL)
        {
            _statBL = p_statBL;
        }

        //GET api/<StatisticController>/5
        [HttpGet("get/{p_user}")]
        public async Task<IActionResult> GetStatistic(string p_user)
        {
            return Ok(await _statBL.GetStatisticAsync(p_user));
        }

        //GET api/<StatisticController>
        [HttpGet]
        public async Task<IActionResult> GetAllStatistics()
        {
            return Ok(await _statBL.GetAllStatisticsAsync());
        }

        //POST api/<StatisticController>
        [HttpPost("update")]
        public async Task<IActionResult> UpdateStatistic(string p_name, bool p_win)
        {
            return Ok(await _statBL.UpdateStatisticAsync(p_name, p_win));
        }
    }
}
