using APIGeneralRepo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.ViewModels
{
    public class GetEmployeeDataVM
    {
        public string NIK { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Salary { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public Degree Degree { get; set; }
        public float GPA { get; set; }
        public string UniversityName { get; set; }
    }
}
