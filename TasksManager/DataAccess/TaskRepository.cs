using Microsoft.EntityFrameworkCore;
using TasksManager.DataAccess.Contexts;
using TasksManager.DataAccess.Interfaces;
using TasksManager.DataAccess.Models;

namespace TasksManager.DataAccess
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TasksContext _tasksContext;

        public TaskRepository(TasksContext tasksContext)
        {
            _tasksContext = tasksContext;
        }
        public bool Write(DbTask dbTask)
        {
            _tasksContext.Tasks.Add(dbTask);

            _tasksContext.SaveChanges();

            return true;
        }
    }
}