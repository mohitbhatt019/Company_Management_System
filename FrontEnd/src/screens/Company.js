import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Company() {
const initData={
    // companyId:"",
    companyName: "",
    companyAddress: "",
    companyGST: ""
}

const[company,setCompany]=useState(null);
const[companyForm,setcompanyForm]=useState({});

useEffect(()=>{
    getAll();
    //console.log(company);
},[])

const changeHandler=(event)=>{
    setcompanyForm({
        ...companyForm,[event.target.name]:event.target.value,
    });
};

function saveClick(){
  debugger
        //jwt
        let token=localStorage.getItem("currentUser");
            alert(companyForm.companyAddress)
        axios.post("https://localhost:7077/api/Company",companyForm,
        {headers:{Authorization:`Bearer ${token}`}},
        ).then((d)=>{
         if(d.data){
          getAll();
          //companyForm(initData)
           alert("Data saved")
         }
         else{
           alert("Data not save")
         }
        }).catch((e)=>{
         alert("wrong with api")
   
        })
 }


function getAll(){
  let token=localStorage.getItem("currentUser");
  axios.get("https://localhost:7077/api/Company",{headers:{Authorization:`Bearer ${token}`},}).then((d)=>{
    if(d.data){
      console.log(d.data)
      setCompany(d.data)
      //alert("Api call secessfull")
    }
    else{
      alert("Api not called secessfully")
    }
  }).catch((e)=>{
    alert("Wrong with api")
  })
}

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

function updateClick(){
  // debugger
  let token=localStorage.getItem("currentUser");
  //alert(employeeForm.employeeName)
  axios.put("https://localhost:7077/api/Company",companyForm,{headers:{Authorization:`Bearer ${token}`}}).then((d)=>{
    if(d.data){ 
      getAll()
      alert("Api call sucessfull")
      console.log(d.data);
     setCompany(d.data);
   }
   else{
     alert("Issue in api")
   }
  }).catch((e)=>{
   alert("error with api")

  })
 }



function deleteClick(companyId){
  debugger
  var token=localStorage.getItem("currentUser")
  //alert(id)
  let ans=window.confirm('Want to delete data???')
  if(!ans) return;
  
  axios.delete("https://localhost:7077/api/Company?companyId="+companyId,{headers:{Authorization:`Bearer ${token}`},
}).then((d)=>{
  
    if(d){
      alert(companyId)
      alert("Data deleted successfully");
      getAll();
    }
    else{
      alert(d.data.message)
    }
  }).catch((e)=>{
    alert(JSON.stringify(e));

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
                      <input type="text" id="txtcompanyName" name="companyName" placeholder="Enter Company Name" className="form-control"
                        value={companyForm.companyName} 
                      onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtcompanyAddress" className='col-sm-4'>
                      Company Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyAddress" name="companyAddress" placeholder="Enter Company Address" className="form-control"
                        value={companyForm.companyAddress} 
                      onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label for="txtcompanyGST" className='col-sm-4'>
                    Company GST
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyGST" name="companyGST" placeholder="Enter Company GST" className="form-control"
                        value={companyForm.companyGST}
                       onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
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


         {/* Edit */}
         <form>
          <div className='modal' id="editModal" role="dialog">
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
                      <input type="text" id="txtcompanyName" name="companyName" placeholder="Enter Company Name" className="form-control"
                        value={companyForm.companyName} 
                      onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtcompanyAddress" className='col-sm-4'>
                      Company Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyAddress" name="companyAddress" placeholder="Enter Company Address" className="form-control"
                        value={companyForm.companyAddress} 
                      onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className='form-group row'>
                   <label for="txtcompanyGST" className='col-sm-4'>
                     companyGST
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtcompanyGST" name="companyGST" placeholder="Enter Company GST" className="form-control"
                        value={companyForm.companyGST} 
                      onChange={changeHandler}
                      />
                    </div>
                  </div>
                  
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
                     onClick={updateClick} 
                    className="btn btn-success" data-dismiss="modal">
                      Update 
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