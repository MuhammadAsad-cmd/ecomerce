import React, { useEffect, useState } from 'react'
import {  AiFillLock } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { resetPasswordAction } from '../../../redux/actions/userAction'

import MetaData from '../../../metaData'

export let ResetPassword=()=>{
    let alert=useAlert();
let dispatch=useDispatch()
// // let {user}=useSelector((e)=>e.userReducer);

// let {isAuthentic}=useSelector((e)=>e.loadUserReducer);

let {error,sms}=useSelector((d)=>d.resetPasswordReducer)
    let [formData,setFormData]=useState({newPassword:"",repeatPassword:""})
let updateFormField=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    // console.log(formData);
}
let submitPasswordFn=(e)=>{
    e.preventDefault();
    let data=Object.fromEntries(new FormData(e.target));
    let urlParams=window.location.pathname.split('/')
    let token=urlParams[urlParams.length-1];
    data.token=token
    // console.log(data);

dispatch(resetPasswordAction(data))
};
useEffect(()=>{
if (error) {
    alert.error(error);
    console.log("reset");

}
if(sms){
    alert.success(sms);
window.location.assign('/account')
}

},[dispatch,error,sms,alert])

return(
    <>
  
  <MetaData title={'reset password'}/>
{/* {isAuthentic && <Navigate to={'/account'}/>} */}

<form onSubmit={submitPasswordFn} className='changePassPage'>

  
    <div className="changePassContainer">
        <div className='chPass_header'>
            <p>
                Reset Password</p>
        </div>
      
        <div className='chPass_newPass'>
            <AiFillLock className='userIcon' />
            <input type="password" name="newPassword" onInput={updateFormField} value={formData.newPassword} placeholder='new Password' />
        </div>
        <div className='chPass_confirmPass'>
            <AiFillLock className='userIcon' />
            <input type="password" name="repeatPassword" onInput={updateFormField} value={formData.repeatPassword} placeholder='Confirm Password' />
        </div>
        <div className='chPass_btn'> <button>Reset Password</button></div>
    </div>
    </form>
    </>
)
}