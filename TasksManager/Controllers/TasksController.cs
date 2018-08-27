using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskWriter _taskWriter;
        private readonly ITaskUpdater _taskUpdater;
        private readonly ITaskReader _taskReader;

        public TasksController(ITaskWriter taskWriter, 
                               ITaskUpdater taskUpdater,
                               ITaskReader taskReader)
        {
            _taskWriter = taskWriter;
            _taskUpdater = taskUpdater;
            _taskReader = taskReader;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        public IActionResult Post([FromBody] Task task)
        {
            if (string.IsNullOrWhiteSpace(task.Name) ||
                string.IsNullOrWhiteSpace(task.Description) ||
                task.Priority <= 0 ||
                task.CompletionTime <= 0)
                return BadRequest("Invalid payload");

            _taskWriter.Save(task);

            return Ok();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        public IActionResult Put(int id, [FromBody] Task task)
        {
            _taskUpdater.Update(task);

            return Ok();
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<IEnumerable<Task>> Get()
        {
            var tasks = _taskReader.LoadAll();

            if (!tasks.Any())
                return BadRequest("No existing tasks");

            return Ok(tasks);
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Task> Get(int id)
        {
            var task = _taskReader.LoadById(id);

            if (task == null)
                return BadRequest("Requested id does not exist");

            return Ok(task);
        }
    }
}
