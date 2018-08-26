﻿using System;

namespace TasksManager.DataAccess.Models
{
    public class DbTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime CompletionTime { get; set; }
    }
}