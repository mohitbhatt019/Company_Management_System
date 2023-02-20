using System.ComponentModel.DataAnnotations;

namespace Company_Project.Models.DTOs
{
    public class EmployeeDTO
    {
        [Key]
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeAddress { get; set; }
        public string Employee_Pancard_Number { get; set; }
        public string Employee_Account_Number { get; set; }
        public string Employee_PF_Number { get; set; }
        public int CompanyId { get; set; }
    }
}
