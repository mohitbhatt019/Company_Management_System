import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {

  const location = useLocation();
  const companyId = location.state?.companyId;
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getAll(companyId);
  }, [companyId]);


  function getAll(companyId) {
    const token = localStorage.getItem('currentUser');
    console.log(employeeList)
    axios
      .get(`https://localhost:7077/api/Company/EmployeesInTheCompany?companyId=${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setEmployeeList(response.data.empInDb);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Employee List</h1>
      <table className="table table-bordered">
        <thead className="bg-info">
          <tr className="text-black">
            <th>Employee Name</th>
            <th>Employee Address</th>
            <th>Employee Pancard Number</th>
            <th>Employee Account Number</th>
            <th>Employee PF Number</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employeeName}</td>
              <td>{employee.employeeAddress}</td>
              <td>{employee.employee_Pancard_Number}</td>
              <td>{employee.employee_Account_Number}</td>
              <td>{employee.employee_PF_Number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;