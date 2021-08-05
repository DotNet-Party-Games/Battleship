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
        [HttpGet("get/{p_sId}")]
        public async Task<IActionResult> GetStatistic(int p_sId)
        {
            return Ok(await _statBL.GetStatisticAsync(p_sId));
        }

        //POST api/<StatisticController>
        [HttpPost("add")]
        public async Task<IActionResult> AddStatistic([FromBody] Statistic p_stat)
        {
            return Created("api/[controller]/add", await _statBL.AddStatisticAsync(p_stat));
        }

        //GET api/<StatisticController>
        [HttpGet]
        public async Task<IActionResult> GetAllStatistics()
        {
            return Ok(await _statBL.GetAllStatisticsAsync());
        }

        //PUT api/<StatisticController>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateStatistic([FromBody] Statistic p_stat)
        {
            return Ok(await _statBL.UpdateStatisticAsync(p_stat));
        }
    }
}
