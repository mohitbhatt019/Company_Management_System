using AutoMapper;
using Company_Project.Models;
using Company_Project.Models.DTOs;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationRepository _designationRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly IEmployeeDesignationRepository _employeeDesignationRepository;
        public DesignationController(IDesignationRepository designationRepository, IMapper mapper, ApplicationDbContext context,
            IEmployeeDesignationRepository employeeDesignationRepository)
        {
            _designationRepository = designationRepository;
            _mapper = mapper;
            _context = context;
            _employeeDesignationRepository= employeeDesignationRepository;
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

        //[HttpPost]
        //[Route("AddEmployeeDesignation")]
        //public IActionResult AddEmployeeDesignation([FromBody] EmployeeDesignationDTO employeeDesignationDTO)
        //{
        //    if ((employeeDesignationDTO == null) && (!ModelState.IsValid))
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var employeeDesignation = _mapper.Map<EmployeeDesignationDTO,EmployeeDesignation>(employeeDesignationDTO);
        //    _employeeDesignationRepository.Add(employeeDesignation);
        //    return Ok(new { message = "Employee Designation Addded Sucessfully" });

        //}

        //[HttpGet]
        //[Route("AddEmployeeDesignation")]

        //public IActionResult GetEmployeeDesignation()
        //{
        //    var employeeDesignations = _employeeDesignationRepository.GetAll();
        //    if (employeeDesignations == null) return NotFound();
        //    return Ok(employeeDesignations);

        //}


        //[HttpGet]
        //public IActionResult GetDesignations()
        //{
        //    var Designations = _designationRepository.GetAll();
        //    if (Designations == null) return NotFound();
        //    return Ok(Designations);

        //}


    }
}
