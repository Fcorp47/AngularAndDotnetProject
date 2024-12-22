using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DotNetAPITask.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAPITask.Controllers
{
    [Route("api/JsonData")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly DataProvider _dataRepo;

        public DataController(DataProvider dataRepo)
        {
            _dataRepo = dataRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetJsonData()
        {
            var jsonData = await _dataRepo.GetJsonDataAsync();
            return Ok(JsonSerializer.Deserialize<object>(jsonData));
        }

        [HttpPost]
        public async Task<IActionResult> SaveJsonData([FromBody] object data)
        {
            await _dataRepo.SaveJsonDataAsync(data);
            return Ok(new {message = "Data added"});
        }
    }
}