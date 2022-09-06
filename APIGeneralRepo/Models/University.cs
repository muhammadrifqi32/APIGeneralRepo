using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Education> Education { get; set; }
    }
}
