import React, { useEffect, useState } from 'react'
import {  AiFillLock } from 'react-icons/ai'
import './changePass.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../../../layout/loader/loader'
import { changePasswordAction } from '../../../redux/actions/userAction'
import MetaData from '../../../metaData'
export let ChangePassword=()=>{
    let alert=useAlert();
let dispatch=useDispatch()
let {error,sms,loading}=useSelector((d)=>d.updatePasswordReducer)
    let [formData,setFormData]=useState({oldPassword:"",newPassword:"",repeatPassword:""})
let updateFormField=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    // console.log(formData);
}
let updatePasswordFn=(e)=>{
    e.preventDefault();
    let data=Object.fromEntries(new FormData(e.target));
    console.log(data);
dispatch(changePasswordAction(data))

};
useEffect(()=>{
if (error) {
    alert.error(error)
}
if(sms){
    alert.success(sms)
}

},[dispatch,error,sms,alert])

return(
    <>
  
  <MetaData title="change password"/>
{loading? <Loader/>:<form onSubmit={updatePasswordFn} className='changePassPage'>


    <div className="changePassContainer">
        <div className='chPass_header'>
            <p>
                Update Password</p>
        </div>
        <div className='chPass_oldPass'>
            <AiFillLock className='userIcon' />
            <input type="password" name="oldPassword" onInput={updateFormField} value={formData.oldPassword} placeholder='Old Password' />
        </div>
        <div className='chPass_newPass'>
            <AiFillLock className='userIcon' />
            <input type="password" name="newPassword" onInput={updateFormField} value={formData.newPassword} placeholder='new Password' />
        </div>
        <div className='chPass_confirmPass'>
            <AiFillLock className='userIcon' />
            <input type="password" name="repeatPassword" onInput={updateFormField} value={formData.repeatPassword} placeholder='Confirm Password' />
        </div>
        <div className='chPass_btn'> <button>Change Password</button></div>
    </div>
    </form>}
    </>
)
}