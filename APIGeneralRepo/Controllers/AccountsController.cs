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
    public class AccountsController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;
        public AccountsController(AccountRepository accountRepository) : base(accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpPost]
        public override ActionResult Insert(Account account)
        {
            var result = accountRepository.Insert(account);
            switch (result)
            {
                case 1:
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data Berhasil Ditambahkan", Data = result });
                case 2:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan, NIK tidak terdaftar", Data = result });
                default:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Data Gagal Ditambahkan", Data = result });
            }
        }
        [HttpPost("Login")]
        public ActionResult Login(LoginVM loginVM)
        {
            var login = accountRepository.Login(loginVM);
            switch (login)
            {
                case 1:
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Login Berhasil", Data = login });
                case 3:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Email/No Hp Tidak Terdaftar", Data = login });
                case 4:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Password Salah", Data = login });
                default:
                    return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = "Terjadi Kesalahan", Data = login });
            }
        }
    }
}
