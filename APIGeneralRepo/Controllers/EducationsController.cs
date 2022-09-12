using APIGeneralRepo.BaseController;
using APIGeneralRepo.Models;
using APIGeneralRepo.Repository.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGeneralRepo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EducationsController : BaseController<Education, EducationRepository, int>
    {
        private readonly EducationRepository educationRepository;
        public EducationsController(EducationRepository educationRepository) : base(educationRepository)
        {
            this.educationRepository = educationRepository;
        }

    }
}
