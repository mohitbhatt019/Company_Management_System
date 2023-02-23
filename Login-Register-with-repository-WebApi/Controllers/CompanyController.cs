using AutoMapper;
using Company_Project.Models;
using Company_Project.Models.DTO;
using Company_Project.Models.DTOs;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using System.Runtime.CompilerServices;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Net.Mime.MediaTypeNames;
using System.Runtime.Intrinsics.X86;
using Company_Project.Migrations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using System;

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
        private readonly IDesignationRepository _designationRepository;
        private readonly IEmployeeDesignationRepository _employeeDesignationRepository;
        private readonly UserManager<ApplicationUser> _userManager;



        public CompanyController(IDesignationRepository designationRepository, 
            ICompanyRepository companyRepository, IMapper mapper,
                        UserManager<ApplicationUser> userManager,
            ApplicationDbContext context, IEmployeeDesignationRepository employeeDesignationRepository)

        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            _context = context;
            _designationRepository = designationRepository;
            _employeeDesignationRepository = employeeDesignationRepository;
            _userManager = userManager;
        }

        //It Method will add employees
        [HttpPost]
        [Route("AddCompany")]

        public IActionResult AddCompany([FromBody] CompanyDTO companyDTO)
        {
            if ((companyDTO == null) && (!ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }

            var company = _mapper.Map<CompanyDTO, Company>(companyDTO);
            _companyRepository.Add(company);

            //_companyRepository.Add(companyDTO);

            return Ok(new { message = "Company Added" });
        }

        //This method will Display the list of all companies
        [HttpGet]
        [Route("GetCompany")]

        public IActionResult GetCompany()
        {
            var companyList = _companyRepository.GetAll();
            if (companyList == null) return NotFound();
            return Ok(companyList);
        }

        //This method will delete company
        //In this updated code, we first check if the company with the given companyId exists in the database.
        //If it does not, we return a 404 NotFound status. Next, we query the database to get all the employees
        //that have the same companyId as the company being deleted. We then use the RemoveRange method to delete
        //all those employees from the database in a single operation.Finally, we delete the company itself and
        //save the changes to the database.

        [HttpDelete]
        [Route("DeleteCompany")]

        public IActionResult DeleteCompany(int companyId)
        {
            if (companyId == null)
            {
                return NotFound();
            }

            // Find all employees in the company
            var employees = _context.Employees.Where(e => e.CompanyId == companyId).ToList();

            if (employees == null || employees.Count == 0)
            {
                return NotFound();
            }

            // Delete each employee and their associated user
            foreach (var employee in employees)
            {
                // Find the user associated with the employee
                var user = _userManager.FindByIdAsync(employee.ApplicationUserId).Result;

                if (user == null)
                {
                    continue; // Move on to the next employee if no user is found
                }

                // Delete the user and employee
                var result = _userManager.DeleteAsync(user).Result;

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                _context.Employees.Remove(employee);
            }
            _context.SaveChanges();
            return Ok();
        }
        //In this code, we first find all the employees in the company using a LINQ query.If there are no employees found, we return a NotFound() response. If there are employees found, we iterate through each employee and find the user associated with that employee.We then delete the user and the employee, and move on to the next employee if no user is found.
    //Finally, we save the changes to the database and return an Ok() response to indicate that the operation was successful.





            //var company = _context.Companies.FirstOrDefault(c => c.CompanyId == companyId);
            //if (company == null)
            //{
            //    return NotFound();
            //}

    //var employeesToDelete = _context.Employees.Where(e => e.CompanyId == companyId);
    //_context.Employees.RemoveRange(employeesToDelete);
    //_context.Companies.Remove(company);
    //_context.SaveChanges();
    //return Ok();
        







//This method will update company
[HttpPut]
        [Route("UpdateCompany")]
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

        //[HttpPost]
        //[Route("AddDesignation")]

        ////In this method, i have added designation in database and added some basic checks that designation cannot be duplicate and null
        //public IActionResult AddDesignation([FromBody] DesignationDTO designationDTO)
        //{
        //    //Here we checking, DesignationDto has data or not and Also serverSide validation
        //    if ((designationDTO == null) && (!ModelState.IsValid))
        //    {
        //        //If above condition is true, then it will return and show message
        //        return BadRequest(ModelState);
        //    }

        //    //Here we map Designation with designationDto
        //    var designation = _mapper.Map<DesignationDTO, Designation>(designationDTO);

        //    //Here we stores designation name That is pass and stores it in variable
        //    //var desig = designationDTO.Name;

        //    ////Here we find that the designation is exist in database or not
        //    //var designationInDb = _context.Designations.FirstOrDefault(designation => designation.Name == desig);

        //    ////if it is already exist in database then it will show error
        //    //if (designationInDb != null)
        //    //{
        //    //    //If above condition is true then it will return
        //    //    return BadRequest(new { message = "Designation already in database" });
        //    //}

        //    //Here designation stored in database
        //    _designationRepository.Add(designation);
        //    return Ok(new { message = "Designation Addded Sucessfully" });

        //}

        [HttpPost]
        [Route("AddEmployeeDesignation")]
        public IActionResult AddEmployeeDesignation([FromBody] EmployeeDesignationDTO employeeDesignationDTO)
        {
            if ((employeeDesignationDTO == null) && (!ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }
            var employeeDesignation = _mapper.Map<EmployeeDesignationDTO, EmployeeDesignation>(employeeDesignationDTO);
            _employeeDesignationRepository.Add(employeeDesignation);
            return Ok(new { message = "Employee Designation Addded Sucessfully" });

        }

        [HttpGet]
        [Route("GetEmployeeDesignation")]

        public IActionResult GetEmployeeDesignation()
        {
            var employeeDesignations = _employeeDesignationRepository.GetAll();
            if (employeeDesignations == null) return NotFound();
            return Ok(employeeDesignations);

        }


        [HttpGet]
        [Route("GetDesignations")]

        public IActionResult GetDesignations()
        {
            var Designations = _designationRepository.GetAll();
            if (Designations == null) return NotFound();
            return Ok(Designations);

        }

        [HttpGet]
        [Route("EmployeesInTheCompany")]
        public IActionResult EmployeesInTheCompany(int companyId)
        {
            var empInDb=_context.Employees.Where(e=>e.CompanyId== companyId).ToList();
            if(empInDb == null) return NotFound(new {message="No employee registered in the company"});
            return Ok(new { empInDb, message = "Employee List Sucessfully" });
        }

    }
}
