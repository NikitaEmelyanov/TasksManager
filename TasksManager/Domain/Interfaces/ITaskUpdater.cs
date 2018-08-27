using TasksManager.Domain.Models;

namespace TasksManager.Domain.Interfaces
{
    public interface ITaskUpdater
    {
        void Update(Task task);
    }
}