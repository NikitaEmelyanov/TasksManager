using Newtonsoft.Json;

namespace TasksManager.Domain.Models
{
    public class Task
    {
        [JsonProperty(PropertyName = "name", Required = Required.Always)]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "description", Required = Required.Always)]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "priority", Required = Required.Always)]
        public int Priority { get; set; }
        [JsonProperty(PropertyName = "time_to_complete", Required = Required.Always)]
        public long TimeToComplete { get; set; }
    }
}