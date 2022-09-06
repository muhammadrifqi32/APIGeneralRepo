using APIGeneralRepo.Context;
using APIGeneralRepo.Models;
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
    }
}
