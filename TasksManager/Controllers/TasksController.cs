using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskWriter _taskWriter;

        public TasksController(ITaskWriter taskWriter)
        {
            _taskWriter = taskWriter;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] Task task)
        {
            _taskWriter.Save(task);

            return Ok();
        }
    }
}
