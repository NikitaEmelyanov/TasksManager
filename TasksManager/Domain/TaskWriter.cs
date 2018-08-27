using System;
using TasksManager.DataAccess.Interfaces;
using TasksManager.DataAccess.Models;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Domain
{
    public class TaskWriter : ITaskWriter
    {
        private readonly ITaskRepository _taskRepository;

        public TaskWriter(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public void Save(Task task)
        {
            var dbTask = ToDbTask(task);

            _taskRepository.Write(dbTask);
        }

        private DbTask ToDbTask(Task task)
        {
            var competionTime = DateTime.Now + TimeSpan.FromSeconds(task.TimeToComplete);
            return new DbTask
            {
                Name = task.Name,
                Description = task.Description,
                Priority = task.Priority,
                CompletionTime = competionTime,
                CreationTime = DateTime.Now
            };
        }
    }
}