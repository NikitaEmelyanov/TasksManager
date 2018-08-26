using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Controllers
{
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskWriter _taskWriter;
        private readonly ITaskReader _taskReader;

        public TasksController(ITaskWriter taskWriter, ITaskReader taskReader)
        {
            _taskWriter = taskWriter;
            _taskReader = taskReader;
        }

        [HttpPost]
        [Route("api/[controller]")]
        [ProducesResponseType(200)]
        public IActionResult Post([FromBody] Task task)
        {
            _taskWriter.Save(task);

            return Ok();
        }

        [HttpGet]
        [Route("api/[controller]")]
        [Produces("application/json")]
        public IEnumerable<Task> Get()
        {
            return _taskReader.LoadAll();
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        [Produces("application/json")]
        public Task Get(int id)
        {
            return _taskReader.LoadById(id);
        }
    }
}
