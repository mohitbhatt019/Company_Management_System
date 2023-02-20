using AutoMapper;
using Company_Project.Models;
using Company_Project.Models.DTO;
using Company_Project.Models.DTOs;
using Company_Project.Repository;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ApplicationDbContext _context;

        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeRepository employeeRepository, IMapper mapper, ApplicationDbContext context)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _context = context;
        }
        [HttpPost]
        public IActionResult AddEmployee(EmployeeDTO employeeDTO)
        {
            if(!(employeeDTO != null)&&(ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }
            var employee = _mapper.Map<Employee>(employeeDTO);
            var companyId = employeeDTO.CompanyId;
            var companyInDb = _context.Companies.Find(companyId);
            if (companyInDb == null) return NotFound(new { message="company Not exist" });

            _employeeRepository.Add(employee);
            return Ok(new { message = "Employee Added" });
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employeeList = _employeeRepository.GetAll();
            if(employeeList ==null) return NotFound(new { message = "No Employee Found" });
            return Ok(employeeList);
        }
        [HttpPut]
        public IActionResult UpdateEmployee(EmployeeDTO employeeDTO) 
        {
            if (!(employeeDTO != null) && (ModelState.IsValid))
            {
                return BadRequest(ModelState);
            }

            var employee = _mapper.Map<Employee>(employeeDTO);
            _employeeRepository.Update(employee);
            return Ok(new { message = "Employee Updated Sucessfully" });
        }
        [HttpDelete]
        public IActionResult DeleteEmployees(int employeeId)
        {
            if (employeeId == null) return NotFound();
            _employeeRepository.Remove(employeeId);
            return Ok(new { message = "Employee Deleted Sucessfully" });

        }
    }
}
