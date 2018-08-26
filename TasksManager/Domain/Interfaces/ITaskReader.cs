using System.Collections.Generic;
using TasksManager.Domain.Models;

namespace TasksManager.Domain.Interfaces
{
    public interface ITaskReader
    {
        IEnumerable<Task> LoadAll();
        Task LoadById(int id);
    }
}