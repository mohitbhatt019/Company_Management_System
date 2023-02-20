import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Employee from './Employee';


function Company() {
const initData={
    companyId:"",
    companyName: "",
    companyAddress: "",
    companyGST: ""
}

const[company,setCompany]=useState(null);
const[companyForm,setcompanyForm]=useState({});

useEffect(()=>{
    getAll();
    console.log(company);
},[])

const changeHandler=(event)=>{
    setcompanyForm({
        ...companyForm,[event.target.name]:event.target.value,
    });
};


function renderCompany(){
    let companyRows=[];
    company?.map((item)=>{
       companyRows.push(
        <tr>
            <td>{item.companyId}</td>
            <td>{item.companyName}</td>
            <td>{item.companyAddress}</td>
            <td>{item.companyGST}</td>
            <td>
              <button onClick={()=>editClick(item)} className='btn btn-info m-1' data-toggle="modal" data-target="#editModal">Edit</button>
              <button onClick={()=>deleteClick(item.companyId)} className='btn btn-danger'>Delete
              </button>
            </td>
        </tr>
       )
    })
    return companyRows
}

function editClick(data){
setcompanyForm(data);
}

function deleteClick(){
// Later
}

function getAll(){
    axios.get("https://localhost:7077/api/Company").then((d)=>{
        if(d.data){
            alert("Api called sucessfull")
            setCompany(d.data)
        }
        else{
            alert("Issue in api")
        }
    }).catch((e)=>{
        alert("Issue in api")
    })
}


  return (
    <div>
        <h2 className='text-primary'>Company Page</h2>
        <div className='row'>
            <div className='col-9'>
                <h2 className='text-info'>Company List</h2>
            </div>
            <div className='col-3'>
                <button className='btn btn-info' data-toggle="modal" data-target="#newModal">New Employee</button>
            </div>
        </div>

        <table className='table table-bordered  table-active'>
            <thead>
                <tr>
                    <th>Company ID</th>
                    <th>Company Name</th>
                    <th>Company Address</th>
                    <th>Company GST</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{renderCompany()}</tbody>
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
                    <label for="txtcompanyName" className='col-sm-4'>
                    Company Name
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyName" name="Name" placeholder="Enter Company Name" className="form-control"
                      //  value={employeeForm.name} 
                      //onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtcompanyAddress" className='col-sm-4'>
                      Company Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyAddress" name="Address" placeholder="Enter Company Address" className="form-control"
                      //  value={employeeForm.name} 
                      //onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label for="txtcompanyGST" className='col-sm-4'>
                    Company GST
                    </label>
                    <div className='col-sm-8'>
                      <input type="number" id="txtcompanyGST" name="Company GST" placeholder="Enter Company GST" className="form-control"
                      //  value={employeeForm.name}
                       //onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
                     //onClick={saveClick} 
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


         {/* Edit */}
         <form>
          <div className='modal' id="editmodal" role="dialog">
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
                    <label for="txtcompanyName" className='col-sm-4'>
                    Company Name
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyName" name="Name" placeholder="Enter Company Name" className="form-control"
                      //  value={employeeForm.name} 
                      //onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtcompanyAddress" className='col-sm-4'>
                      Company Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyAddress" name="Address" placeholder="Enter Company Address" className="form-control"
                      //  value={employeeForm.name} 
                      //onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label for="txtcompanyGST" className='col-sm-4'>
                    Company GST
                    </label>
                    <div className='col-sm-8'>
                      <input type="number" id="txtcompanyGST" name="Salary" placeholder="Enter Company GST" className="form-control"
                      //  value={employeeForm.name}
                       //onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
                     //onClick={editClick} 
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


    </div>
  )
}

export default Company