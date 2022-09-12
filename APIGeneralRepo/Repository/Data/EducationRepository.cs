using APIGeneralRepo.Context;
using APIGeneralRepo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Repository.Data
{
    public class EducationRepository : GeneralRepository<MyContext, Education, int>
    {
        private readonly MyContext context;
        public EducationRepository(MyContext context) : base(context)
        {
            this.context = context;
        }

    }
}
