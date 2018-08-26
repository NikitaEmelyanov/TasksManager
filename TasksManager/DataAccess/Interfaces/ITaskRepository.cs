using TasksManager.DataAccess.Models;

namespace TasksManager.DataAccess.Interfaces
{
    public interface ITaskRepository
    {
        bool Write(DbTask dbTask);
    }
}