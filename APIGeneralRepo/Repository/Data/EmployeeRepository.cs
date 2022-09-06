using APIGeneralRepo.Context;
using APIGeneralRepo.Models;
using APIGeneralRepo.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        private readonly MyContext context;
        public EmployeeRepository(MyContext context) : base(context)
        {
            this.context = context;
        }

        public const int Successful = 1;
        public const int PhoneExists = 2;
        public const int EmailExists = 3;
        public const int Error = 500;

        public string FormattedNIK()
        {
            var formattedNIK = "";
            int countEmp = context.Employees.ToList().Count();

            var totalEmp = countEmp + 1;
            return formattedNIK = $"{DateTime.Now.ToString("ddMMyyyy")}{totalEmp.ToString("D3")}";
        }

        public override int Insert(Employee employee)
        {
            var checkEmail = context.Employees.SingleOrDefault(e => e.Email == employee.Email);
            var checkPhone = context.Employees.SingleOrDefault(e => e.Phone == employee.Phone);
            if (checkEmail != null)
            {
                return EmailExists;
            }
            else if (checkPhone != null)
            {
                return PhoneExists;
            }
            else if (checkEmail == null && checkPhone == null)
            {
                employee.NIK = FormattedNIK();
                context.Employees.Add(employee);
                context.SaveChanges();
                return Successful;
            }
            else
            {
                return Error;
            }
        }
        public int Register(RegisterVM registerVM)
        {
            var checkEmail = context.Employees.SingleOrDefault(e => e.Email == registerVM.Email);
            var checkPhone = context.Employees.SingleOrDefault(e => e.Phone == registerVM.Phone);
            if (checkEmail != null)
            {
                return EmailExists;
            }
            else if (checkPhone != null)
            {
                return PhoneExists;
            }
            else if (checkEmail == null && checkPhone == null)
            {
                Employee emp = new Employee
                {
                    NIK = FormattedNIK(),
                    FirstName = registerVM.FirstName,
                    LastName = registerVM.LastName,
                    Phone = registerVM.Phone,
                    Email = registerVM.Email,
                    Salary = registerVM.Salary,
                    BirthDate = registerVM.BirthDate,
                    Gender = registerVM.Gender
                };
                context.Employees.Add(emp);
                context.SaveChanges();
                Account acc = new Account
                {
                    NIK = emp.NIK,
                    Password = registerVM.Password
                };
                context.Accounts.Add(acc);
                context.SaveChanges();
                Education edu = new Education
                {
                    Degree = registerVM.Degree,
                    GPA = registerVM.GPA,
                    UniversityId = registerVM.UniversityId
                };
                context.Educations.Add(edu);
                context.SaveChanges();
                Profiling profiling = new Profiling
                {
                    NIK = emp.NIK,
                    EducationId = edu.Id
                };
                context.Profilings.Add(profiling);
                context.SaveChanges();
                return Successful;
            }
            else
            {
                return Error;
            }
        }
        public IEnumerable<Object> GetEmployeeData()
        {
            var qry = from emp in context.Employees
                      join act in context.Accounts
                         on emp.NIK equals act.NIK
                      join prof in context.Profilings
                         on act.NIK equals prof.NIK
                      join edu in context.Educations
                        on prof.EducationId equals edu.Id
                      join uni in context.Universities
                         on edu.UniversityId equals uni.Id
                      select new GetEmployeeDataVM
                      {
                          NIK = emp.NIK,
                          FullName = emp.FirstName + "  " + emp.LastName,
                          Phone = emp.Phone,
                          Gender = emp.Gender,
                          Email = emp.Email,
                          BirthDate = emp.BirthDate,
                          Salary = emp.Salary,
                          GPA = edu.GPA,
                          Degree = edu.Degree,
                          UniversityName = uni.Name
                      };
            return qry;
        }
    }
}
