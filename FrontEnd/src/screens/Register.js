import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


function Register() {
  const initData={
    Username:"",
    Email:"",
    Password:""
  };
  const[registerForm,setRegisterForm]=useState(initData);
  const[registerFormError,setregisterFormError]=useState(initData);
  const navigate=useNavigate();

  const ChangeHandler=(event)=>{
    setRegisterForm({
      ...registerForm,[event.target.name]:event.target.value,
    });
  }

  const registerClick=()=>{
    //alert(registerForm.Username)

    //Validation Check
    let hasError=false;
    let messages=initData;

    if(registerForm.Username.trim().length==0)
    {
      hasError=true;
      messages={...messages,Username:"Username is empty!!!"};
    }
    if(registerForm.Password.trim().length==0){
      messages={...messages,Password:"Password is empty"}
    }
    if(registerFormError.Email.trim().length==0){
      messages={...messages,Email:"Email is empty"}
    }
    if(hasError){
      setregisterFormError(messages);
    }
    else{
      setregisterFormError(initData);
   
    //alert(registerForm.Username)
    axios.post("https://localhost:7077/api/Authenticate/Register",registerForm).then((d)=>{
      if(d){
        alert("User Registered Successfully")
      }
      else{
        alert("User Not Registeres/ Retry")
      }
    }).catch((e)=>{
        alert("User Not Registeres/ Retry")
        //alert(JSON.stringify(e));
    })
  }
  }

 
 
  return (
    
    <div className='row col-lg-6 mx-auto m-2 p-2'>
      
<div class="card text-center">
  <div class="card-header text-info">Register</div>
  <div class="card-body">


    <div className='form-group row'>
      <label className='col-lg-4' for="txtusername" >Username</label>
      <div className='col-lg-8'>
        <input type="text" id="txtusername"  onChange={ChangeHandler}  placeholder='Enter Username' className='Form-control' 
        name='Username'/>
        { <p className='text-danger'>{registerFormError.Username}</p> }
      </div>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4' for="txtconfirmpassword">Email</label>
      <div className='col-lg-8'>
        <input type="text" onChange={ChangeHandler} id="txtconfirmpassword"  placeholder='Enter Email' className='Form-control' name='Email'/>
        { <p className='text-danger'>{registerFormError.Email}</p> }
      </div>
    </div>

    
    <div className='form-group row'>
      <label className='col-lg-4' for="txtpassword">Password</label>
      <div className='col-lg-8'>
        <input type="password"  onChange={ChangeHandler} id="txtpassword"  placeholder='Enter Password' className='Form-control' name='Password'/>
        { <p className='text-danger'>{registerFormError.Password}</p> }

      </div>
    </div>
  
  </div>
  <div className='card-footer text-muted'>
    <button onClick={registerClick} className='btn btn-info'>Register</button>
  </div>
</div>
    </div>  )
}

export default Register