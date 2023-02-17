import React from 'react'
import Header from './Header'
import  { useEffect, useState } from 'react'


function Employee() {
    return (
        <div>
        <h2 className='text-primary text-center'>Employee Page</h2>
        <div className='row'>
          <div className='col-9'>
          <h2 className='text-info text-left'>Employee List</h2>
          </div>
          <div className='col-3'>
            <button className='btn btn-info'data-toggle="modal" data-target="#newModal">New Employee</button>
          </div>
        </div>
  
        <table className='table table-bordered  table-active'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>{renderEmployee()}</tbody> */}
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
                    <label for="txtname" className='col-sm-4'>
                      Name
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtname" name="Name" placeholder="Enter Name" className="form-control"
                      //  value={employeeForm.name} 
                    //   onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtaddress" className='col-sm-4'>
                      Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtaddress" name="Address" placeholder="Enter Address" className="form-control"
                      //  value={employeeForm.name} 
                    //   onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label for="txtsalary" className='col-sm-4'>
                    Salary
                    </label>
                    <div className='col-sm-8'>
                      <input type="number" id="txtsalary" name="Salary" placeholder="Enter Salary" className="form-control"
                      //  value={employeeForm.name}
                    //    onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
                    //  onClick={saveClick} 
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
                <div className='modal-header bg-info'>
                  <div className='modal-title text-white'>Edit Employee</div>
                  <button className='close' data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                {/* Body */}
                <div className='modal-body'>
                  <div className='form-group row'>
                    <label for="txtname" className='col-sm-4'>
                      Name
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtname" name="Name" placeholder="Enter Name" className="form-control"
                        // value={employeeForm.Name} 
                        // onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                   <label for="txtaddress" className='col-sm-4'>
                      Address
                    </label>
                    <div className='col-sm-8'>
                      <input type="text" id="txtaddress" name="Address" placeholder="Enter Address" className="form-control"
                        // value={employeeForm.Address} 
                        // onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label for="txtsalary" className='col-sm-4'>
                    Salary
                    </label>
                    <div className='col-sm-8'>
                      <input type="number" id="txtsalary" name="Salary" placeholder="Enter Salary" className="form-control"
                        // value={employeeForm.Salary} 
                        // onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className='modal-footer bg-info'>
                  <button
                    //  onClick={updateClick} 
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
        </div>    )
}

export default Employee