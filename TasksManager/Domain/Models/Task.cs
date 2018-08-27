using Newtonsoft.Json;

namespace TasksManager.Domain.Models
{
    public class Task
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name", Required = Required.Always)]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "description", Required = Required.Always)]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "priority", Required = Required.Always)]
        public int Priority { get; set; }
        [JsonProperty(PropertyName = "status")]
        public TaskStatus Status { get; set; }
        [JsonProperty(PropertyName = "completion_time", Required = Required.Always)]
        public long CompletionTime { get; set; }
        [JsonProperty(PropertyName = "creation_time")]
        public long CreationTime { get; set; }
    }
}