using Company_Project.Models;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;
        public CompanyController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        [HttpPost]
        public IActionResult AddCompany([FromBody]Company company)
        {
            if ((company == null)&&(!ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }
            _companyRepository.Add(company);
           
            return Ok();
          
        }
    }
}
