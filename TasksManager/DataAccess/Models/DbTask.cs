using System;

namespace TasksManager.DataAccess.Models
{
    public class DbTask
    {
        public DbTask(string name, string description, int priority, DateTime completionTime)
        {
            Name = name;
            Description = description;
            Priority = priority;
            CompletionTime = completionTime;
        }
        public string Name { get; }
        public string Description { get; }
        public int Priority { get; }
        public DateTime CompletionTime { get; }
    }
}