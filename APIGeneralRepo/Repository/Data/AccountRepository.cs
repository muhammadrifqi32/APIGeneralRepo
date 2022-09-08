using APIGeneralRepo.Context;
using APIGeneralRepo.Models;
using APIGeneralRepo.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Repository.Data
{
    public class AccountRepository : GeneralRepository<MyContext, Account, string>
    {
        private readonly MyContext context;
        public AccountRepository(MyContext context) : base(context)
        {
            this.context = context;
        }

        public const int Successful = 1;
        public const int notfound = 2;
        public const int emailOrPhoneNotFound = 3;
        public const int wrongPassword = 4;

        public override int Insert(Account account)
        {
            var checknik = context.Employees.Find(account.NIK);
            if (checknik != null)
            {
                context.Accounts.Add(account);
                context.SaveChanges();
                return Successful;
            }
            else if (checknik == null)
            {
                return notfound;
            }
            else
            {
                return 500;
            }
        }

        public int Login(LoginVM loginVM)
        {
            var check = context.Employees.Where(e => e.Email == loginVM.Username || e.Phone == loginVM.Username).SingleOrDefault();
            bool verify = BCrypt.Net.BCrypt.Verify(loginVM.Password, check.Account.Password);

            if (check == null)
            {
                return emailOrPhoneNotFound;
            }
            else if (verify == true)
            {
                return Successful;
            }
            else if(verify == false)
            {
                return wrongPassword;
            }
            else 
            {
                return 500;
            }
        }
    }
}
