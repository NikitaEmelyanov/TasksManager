using System.Collections.Generic;
using TasksManager.DataAccess.Models;

namespace TasksManager.DataAccess.Interfaces
{
    public interface ITaskRepository
    {
        void Write(DbTask dbTask);
        IEnumerable<DbTask> ReadAll();
        void Update(DbTask dbTask);
    }
}