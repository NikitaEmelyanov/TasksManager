using TasksManager.Domain.Models;

namespace TasksManager.Domain.Interfaces
{
    public interface ITaskWriter
    {
        void Save(Task task);
    }
}