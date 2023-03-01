import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const initData={
    username:"",
    email:"",
    password:"",
    role:"",
    employeeName:"",//
    employeeAddress:"",//
    employee_Pancard_Number:"",//
    employee_Account_Number:"",//
    employee_PF_Number:"",//
    companyId:""//
  };

  const location = useLocation();
  const companyId = location.state?.companyId;
  const [employeeList, setEmployeeList] = useState([]);
  const[employeeForm,setEmployeeForm]=useState({});
  const[designationForm,setDesignationForm]=useState({})
  const[assignDesignationForm,setassignDesignationForm]=useState({})
  const [selectedRole, setSelectedRole] = useState('');
  const roles = [ 'Company', 'Employee'];

  




  useEffect(() => {
    getAll(companyId);
  }, [companyId]);

  const changeHandler=(event)=>{
    setEmployeeForm({
      ...employeeForm,[event.target.name]:event.target.value,
    });
  };
  
  const changeHand=(event)=>{
    setDesignationForm({
    ...designationForm,[event.target.name]:event.target.value
    })
  }

  const changeAssignDesignation=(event)=>{
    setassignDesignationForm({
      ...assignDesignationForm,[event.target.name]:event.target.value
    })
  }


  function getAll(companyId) {
    const token = localStorage.getItem('currentUser');
    console.log(employeeList)
    axios
      .get(`https://localhost:7077/api/Company/EmployeesInTheCompany?companyId=${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //debugger
        console.log(response.data);
        setEmployeeList(response.data.empInDb);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function saveClick(){
    debugger
    let token=localStorage.getItem("currentUser");
    employeeForm.role=selectedRole
    console.log(employeeForm)
    axios.post("https://localhost:7077/api/Employee",employeeForm,{headers:{Authorization:`Bearer ${token}`}}).then((d)=>{
      if(d){
         setEmployeeForm({ companyId: companyId }); // Clear form fields except companyId
        getAll(companyId)
        alert("Employee Save Sucessfully")

      }
      else{
        alert("Employee not saved")
      }
    }).catch((e)=>{
      alert(d.message)
    })
  }

  function handleNewEmployeeClick() {
    setEmployeeForm({ ...employeeForm, companyId: companyId });
    document.getElementById('txtId').value = companyId;
    document.getElementById('txtId').disabled = true;
  }

  function saveDesignation(){
    debugger
    let token=localStorage.getItem("currentUser")
console.log(designationForm)
    axios.post("https://localhost:7077/api/Company/AddDesignation",designationForm,{headers:{Authorization:`Bearer ${token}`}}).then((d)=>{
      if(d.data.status==2){
        alert(d.data.message)
      }
      else{
        alert(d.data.message)

      }
    }).catch((e)=>{
      alert("Issue in api")
    })
  }

  function saveAssignDesignation(){
    debugger
    let token=localStorage.getItem("currentUser")
    console.log(assignDesignationForm)
    axios.post("https://localhost:7077/api/Company/AddEmployeeDesignation",assignDesignationForm,{headers:{Authorization:`Bearer ${token}`}}).then((d)=>{
      if(d){
        alert("Designation Assigned sucessfully")
      }
      else{
        alert("Designation not Assigned")

      }
    }).catch((e)=>{
      alert("Issue in api")
    })
  }

function designationsList(){
  let token=localStorage.getItem('currentUser')
 //** */
}

  return (
    <div>
      <div className='row'>  
             <div className='col-2'>
                <button className=' bg-info m-2 p-2' data-toggle="modal" data-target="#dsgModal" >ADD DESIGNATION</button>
            </div> 
            <div className='col-2'>
                <button className=' bg-info m-2 p-2' data-toggle="modal" data-target="#assModal" >Assign DESIGNATION</button>
            </div>
            <div className='col-2'>
                <button className='bg-info m-2 p-2' data-toggle="modal"  data-target="#dsgListModal" onClick={designationsList} > Designation List</button>
            </div>
            <div className='col-4'>
                <h2 className='text-info'>Employee List</h2>
            </div>
            <div className='col-2'>
                <button className=' bg-info m-2 p-2' data-toggle="modal" data-target="#newModal" onClick={handleNewEmployeeClick}>Add Employee</button>
            </div>
          
        </div>
      <table className="table table-bordered">
        <thead className="bg-info">
          <tr className="text-black">
            <th>Employee Name</th>
            <th>Employee Address</th>
            <th>Employee Pancard Number</th>
            <th>Employee Account Number</th>
            <th>Employee PF Number</th>
            <th>Role</th>
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
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Save */}
      <form>
          <div className='modal' id="newModal" role="dialog">
            <div className="modal-dialog">
              <div className='modal-content'>
                {/* header */}
                <div className='modal-dialog '>
                  <div className='modal-content'>
  
                  </div>
                  
                </div>
                {/* Body */}
                <div className='modal-body'>

                <div className='form-group row'>
                    <label for="txtId" className='col-sm-4'>
                    Employee Company ID
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtId" name="employeeId" className="form-control"
                        value={companyId} 
                      />
                    </div>
                  </div>

                  <div className='form-group row'>
      <label className='col-lg-4' for="txtusername" >Username</label>
      <div className='col-lg-8'>
        <input type="text" id="txtusername"  onChange={changeHandler} value={employeeForm.username}  placeholder='Enter Username' className='Form-control' 
        name='Username'/>
        {/* { <p className='text-danger'>{registerFormError.Username}</p> } */}
      </div>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4' for="txtconfirmpassword">Email</label>
      <div className='col-lg-8'>
        <input type="text" onChange={changeHandler} value={employeeForm.email} id="txtconfirmpassword"  placeholder='Enter Email' className='Form-control' name='Email'/>
        {/* { <p className='text-danger'>{registerFormError.Email}</p> } */}
      </div>
    </div>

    
    <div className='form-group row'>
      <label className='col-lg-4' for="txtpassword">Password</label>
      <div className='col-lg-8'>
        <input type="password"  onChange={changeHandler} id="txtpassword" value={employeeForm.password}  placeholder='Enter Password' className='Form-control' name='Password'/>
        {/* { <p className='text-danger'>{registerFormError.Password}</p> } */}

      </div>
    </div>


            <div className='form-group row'>
              <label for="txtname" className='col-sm-4'>
                Employee Name
              </label>
              <div className='col-sm-8'>
                <input type="text" id="txtname" name="employeeName" placeholder="Enter Employee Name"
                className="form-control" value={employeeForm.employeeName} onChange={changeHandler}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label for="employeeAddress" className='col-sm-4'>
                Employee Address
              </label>
              <div className='col-sm-8'>
                <input type="text" id="employeeAddress" name="employeeAddress" placeholder="Enter Address"
                className="form-control" value={employeeForm.employeeAddress} onChange={changeHandler}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label for="txtsalary" className='col-sm-4'>
                employee Pancard Number
              </label>
              <div className='col-sm-8'>
                <input type="text" id="txtsalary" name="employee_Pancard_Number" placeholder="Enter Pancard Number"
                className="form-control" value={employeeForm.employee_Pancard_Number}
                onChange={changeHandler} />
              </div>
            </div>

            <div className='form-group row'>
              <label for="employee_Account_Numberrr" className='col-sm-4'>
                Employee Account Number
              </label>
              <div className='col-sm-8'>
                <input type="number" id="employee_Account_Numberrr" name="employee_Account_Number"
                placeholder="Enter  Account Number" className="form-control" value={employeeForm.employee_Account_Number}
                onChange={changeHandler} />
              </div>
            </div>


            <div className='form-group row'>
              <label for="employee_PF_Number" className='col-sm-4'>
                Employee PF Number
              </label>
              <div className='col-sm-8'>
                <input type="number" id="employee_PF_Number" name="employee_PF_Number" placeholder="Enter Employee PF Number"
                className="form-control" value={employeeForm.employee_PF_Number}
                onChange={changeHandler} />
              </div>
            </div>
            {/*
            <div className='form-group row'>
              <label for="EmployeeCompanyId" className='col-sm-4'>
                Employee Company Id
              </label>
              <div className='col-sm-8'>
                <input type="number" id="EmployeeCompanyId" name="companyId" placeholder="Enter Company Id"
                className="form-control" value={employeeForm.companyId} onChange={changeHandler}
                />
              </div>
            </div> */}
            
            <div className='form-group row'>
  <label className='col-lg-4' htmlFor="role">User Role</label>
  <div className='col-lg-8'>
    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} id="role">
      <option value="">Select a role</option>
      {roles.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  </div>
  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button id='saveButton'
                      onClick={saveClick} 
                    className="btn btn-success" data-dismiss="modal">
                      Save 
                  </button>
                  <button className='btn btn-danger' data-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
 
              {/* Designation */}

        <div class="modal" tabindex="-1" id="dsgModal" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Designation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                <div className='form-group row'>
                    <label for="txtdesignation" className='col-sm-4'>
                    Designation
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtdesignation" name="name" placeholder="Enter DESIGNATION name" className="form-control"
                        onChange={changeHand}
                      />
                    </div>
                  </div>  

             


                  </div>
      <div class="modal-footer">
        <button type="button" onClick={saveDesignation} class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


 {/*Assign Designation */}

 <div class="modal" tabindex="-1" id="assModal" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Assign Designation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                <div className='form-group row'>
                    <label for="txtdesignation" className='col-sm-4'>
                    Designation
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtdesignation" name="designationName" placeholder="Enter DESIGNATION Name" className="form-control"
                        //value={designationForm.name}
                        onChange={changeAssignDesignation}
                      />
                    </div>
                  </div>  

                  <div className='form-group row'>
                    <label for="txtempid" className='col-sm-4'>
                    Employee ID
                    </label>
                    <div className='col-sm-8'>
                      <input type="number" id="txtempid" name="employeeId" placeholder="Enter Employee ID" className="form-control"
                        //value={designationForm.name}
                        onChange={changeAssignDesignation}
                      />
                    </div>
                  </div>  


                  </div>
      <div class="modal-footer">
        <button type="button" onClick={saveAssignDesignation} class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

{/* Designation List dsgListModal */}

<div class="modal" tabindex="-1" id="dsgListModal" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Designations in CompanyId={companyId}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

           <table class='table table-bodred table-hover'>
              <thead>
                <tr>
                  <th>Designation Id</th>
                  <th>Designation Name</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>     

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




    </div>
  );
}

export default EmployeeList;