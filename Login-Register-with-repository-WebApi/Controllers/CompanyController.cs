using AutoMapper;
using Company_Project.Models;
using Company_Project.Models.DTO;
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
        private readonly IMapper _mapper;
        public CompanyController(ICompanyRepository companyRepository ,IMapper mapper)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddCompany([FromBody]CompanyDTO companyDTO)
        {
            if ((companyDTO == null)&&(!ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }

            var company = _mapper.Map<CompanyDTO, Company>(companyDTO);
            _companyRepository.Add(company); 

            //_companyRepository.Add(companyDTO);

            return Ok(new {message="Company Added"});
        }
        [HttpGet]
        public IActionResult GetCompany()
        {
            var companyList=_companyRepository.GetAll();
            if(companyList==null) return NotFound();
            return Ok(companyList);
        }

        [HttpDelete] 
        public IActionResult DeleteCompany(int companyId)
        {
            if (companyId == null) return NotFound();
            _companyRepository.Remove(companyId);
            return Ok(new {message="Company Deleted Sucessfully"});  
        }

        [HttpPut]
        public IActionResult UpdateCompany([FromBody] CompanyDTO companyDTO)
        {
            if ((companyDTO == null) && (!ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }
            var company=_mapper.Map<Company>(companyDTO);
            _companyRepository.Update(company);
            return Ok(new { message = "Company Updated Sucessfully" });

        }


    }
}
