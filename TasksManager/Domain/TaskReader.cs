using System;
using System.Collections.Generic;
using TasksManager.DataAccess.Interfaces;
using TasksManager.DataAccess.Models;
using TasksManager.Domain.Interfaces;
using TasksManager.Domain.Models;

namespace TasksManager.Domain
{
    public class TaskReader : ITaskReader
    {
        private readonly ITaskRepository _taskRepository;

        public TaskReader(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public IEnumerable<Task> LoadAll()
        {
            var dbTasks = _taskRepository.ReadAll();
            
            return ToTasks(dbTasks);
        }

        public Task LoadById(int id)
        {
            var dbTask = _taskRepository.ReadById(id);

            return ToTask(dbTask);
        }

        private IEnumerable<Task> ToTasks(IEnumerable<DbTask> dbTasks)
        {
            foreach (var dbTask in dbTasks)
            {
                yield return ToTask(dbTask);
            }
        }

        private Task ToTask(DbTask dbTask)
        {
            var timeToComplete = (long)(dbTask.CompletionTime - DateTime.Now).TotalSeconds;
            if (timeToComplete < 0)
                timeToComplete = 0;
            return new Task
            {
                Name = dbTask.Name,
                Description = dbTask.Description,
                Priority = dbTask.Priority,
                TimeToComplete = timeToComplete
            };
        }
    }
}