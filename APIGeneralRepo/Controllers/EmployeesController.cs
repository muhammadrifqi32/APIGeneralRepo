using APIGeneralRepo.BaseController;
using APIGeneralRepo.Models;
using APIGeneralRepo.Repository.Data;
using APIGeneralRepo.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace APIGeneralRepo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        public EmployeesController(EmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }
        [HttpGet]
        public override ActionResult Get()
        {
            var result = employeeRepository.Get();
            if (result.Count() != 0)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = result.Count() + " Data Ditemukan", Data = result });
            }
            else
            {
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = result.Count() + " Data Ditemukan", Data = result });
            }
        }
        [HttpPost]
        public override ActionResult Insert(Employee employee)
        {
            var result = employeeRepository.Insert(employee);
            switch (result)
            {
                case 1:
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data Berhasil Ditambahkan", Data = result });
                case 2:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan, Nomor HP Telah Digunakan", Data = result });
                case 3:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan, Email Nomor HP Telah Digunakan", Data = result });
                default:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan", Data = result });
            }
        }
        [HttpPost("Register")]
        public ActionResult Register(RegisterVM registerVM)
        {
            var result = employeeRepository.Register(registerVM);
            switch (result)
            {
                case 1:
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data Berhasil Ditambahkan", Data = result });
                case 2:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan, Nomor HP Telah Digunakan", Data = result });
                case 3:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan, Email Nomor HP Telah Digunakan", Data = result });
                default:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan", Data = result });
            }
        }
        
        [HttpGet("GetEmployeeData")]
        public ActionResult GetEmployeeData()
        {
            var result = employeeRepository.GetEmployeeData();
            if (result.Count() != 0)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = result.Count() + " Data Ditemukan", Data = result });
            }
            else
            {
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = result.Count() + " Data Ditemukan", Data = result });
            }
        }
    }
}
