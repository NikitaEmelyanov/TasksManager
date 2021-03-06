﻿using System;
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

        private IEnumerable<Task> ToTasks(IEnumerable<DbTask> dbTasks)
        {
            foreach (var dbTask in dbTasks)
            {
                yield return ToTask(dbTask);
            }
        }

        private Task ToTask(DbTask dbTask)
        {
            return new Task
            {
                Id = dbTask.Id,
                Name = dbTask.Name,
                Description = dbTask.Description,
                Priority = dbTask.Priority,
                Status = dbTask.Status,
                CompletionTime = ((DateTimeOffset)dbTask.CompletionTime).ToUnixTimeSeconds(),
                CreationTime = ((DateTimeOffset)dbTask.CreationTime).ToUnixTimeSeconds()
            };
        }
    }
}