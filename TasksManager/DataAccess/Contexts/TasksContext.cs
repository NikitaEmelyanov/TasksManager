using Microsoft.EntityFrameworkCore;
using TasksManager.DataAccess.Models;

namespace TasksManager.DataAccess.Contexts
{
    public class TasksContext : DbContext
    {
        public TasksContext(DbContextOptions<TasksContext> options)
            : base(options)
        {
            
        }

        public DbSet<DbTask> Tasks { get; set; }
    }
}