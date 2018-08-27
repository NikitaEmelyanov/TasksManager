using System.Collections.Generic;
using System.Linq;
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
        public void Write(DbTask dbTask)
        {
            _tasksContext.Tasks.Add(dbTask);

            _tasksContext.SaveChanges();
        }

        public IEnumerable<DbTask> ReadAll()
        {
            return _tasksContext.Tasks.ToList();
        }

        public DbTask ReadById(int id)
        {
            return _tasksContext.Tasks.FirstOrDefault(o => o.Id == id);
        }

        public void Update(DbTask dbTask)
        {
            _tasksContext.Tasks.Update(dbTask);

            _tasksContext.SaveChanges();
        }
    }
}