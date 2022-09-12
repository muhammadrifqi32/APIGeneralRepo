using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Models
{
    public class Education
    {
        public int Id { get; set; }
        public Degree Degree { get; set; }
        public float GPA { get; set; }
        public int UniversityId { get; set; }
        [JsonIgnore]
        public virtual ICollection<Profiling> Profiling { get; set; }
        public virtual University University { get; set; }
    }
    public enum Degree
    {
        D3,
        D4,
        S1,
        S2,
        S3
    }
}
