using AutoMapper;
using Company_Project.Models;
using Company_Project.Models.DTO;
using Company_Project.Models.DTOs;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper; 
        private readonly ApplicationDbContext _context;
        public CompanyController(ICompanyRepository companyRepository ,IMapper mapper, ApplicationDbContext context )
             
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            _context= context;
        }

        //It Method will add employees
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

        //This method will Display the list of all companies
        [HttpGet]
        public IActionResult GetCompany()
        {
            var companyList=_companyRepository.GetAll();
            if(companyList==null) return NotFound();
            return Ok(companyList);
        }

        //This method will delete company

        [HttpDelete] 
        public IActionResult DeleteCompany(int companyId)
        {
            if (companyId == null) return NotFound();
            _companyRepository.Remove(companyId);
            return Ok(new {message="Company Deleted Sucessfully"});  
        }


        //This method will update company
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

        [HttpPost]
        [Route("AddDesignation")]
        public IActionResult AddDesignation([FromBody] DesignationDTO  designationDTO )
        {
            if (!(designationDTO != null) && (ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }
            var designation= _mapper.Map<DesignationDTO,Designation>(designationDTO);


            _context.Designations.Add(designation);
            _context.SaveChanges();
            return Ok(new { status = 1, messgae = "Designation created sucessfully" });
        }







    }
}
