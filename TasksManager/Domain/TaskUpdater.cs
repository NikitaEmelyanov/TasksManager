using System;
using TasksManager.DataAccess.Interfaces;
using TasksManager.DataAccess.Models;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Domain
{
    public class TaskUpdater : ITaskUpdater
    {
        private readonly ITaskRepository _taskRepository;

        public TaskUpdater(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public void Update(Task task)
        {
            var dbTask = ToDbTask(task);

            _taskRepository.Update(dbTask);
        }
        private DbTask ToDbTask(Task task)
        {
            return new DbTask
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                Priority = task.Priority,
                Status = task.Status,
                CompletionTime = DateTimeOffset.FromUnixTimeSeconds(task.CompletionTime).DateTime,
                CreationTime = DateTimeOffset.FromUnixTimeSeconds(task.CreationTime).DateTime,
            };
        }
    }
}