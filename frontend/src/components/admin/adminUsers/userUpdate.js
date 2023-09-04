import React, { useEffect, useState } from 'react'


import {  FaUserSecret } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux';
import '../Adminproducts/AdminCreateProduct.css'



import { useAlert } from 'react-alert'
import { Navigate, useParams } from 'react-router-dom'
import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';
import Sidebar from '../AdminSideBar/sidebar';
import { AdminDelClearSms_error } from '../../redux/actions/productAction';
import { adminLoadUserAction, updateUserAction } from '../../redux/actions/userAction';
export default function AdminUpdateUser() {

let alert=useAlert();
// below reducer in useSeletor hock will be use for both new product and update product
    let {loading,error,sms}=useSelector((e)=>e.adminUpdateUserReducer)
    let {user}=useSelector((e)=>e.adminLoadUserReducer)

let dispatch=useDispatch()
let params=useParams();
let [userName,setUserName]=useState('')
let [userMail,setUserMail]=useState('')
let [userRole,setUserRole]=useState('')




    // submit form function
    let SubmitHandler=(e)=>{
        e.preventDefault()
        
        if ( !userName || !userMail) {
            return alert.error("please fill all filds")
        }
        
       
dispatch(updateUserAction({name:userName,email:userMail,role:userRole},params.id))
        console.log(userRole);



    }

useEffect(()=>{
    setUserName(user.name);
    setUserMail(user.email)
    setUserRole(user.role)
},[user])
    useEffect(()=>{
        if (error) alert.error(error);
 
        if (sms)  alert.success(sms);
        
        dispatch(AdminDelClearSms_error())
        dispatch(adminLoadUserAction(params.id))
    },[dispatch,error,sms,alert,params.id])

  return (
    <>
    {sms && <Navigate to={"/admin/users"}/>}
     <MetaData title="update user"/>
   { loading && <Loader/> }
   <div className="ad_create_product_pg">
        <div className='borderRight'>
            <Sidebar active='users'/>
        </div>
      {user?.name && <div className='adCreateProformSec'>
            <form action=""  encType="multipart/form-data" onSubmit={SubmitHandler}>
                <h2>Update User</h2>
    

                <div>
                    <AiOutlineUser/>
                    <input type="text"  name="name" id=""  value={userName} onChange={(e)=>setUserName(e.target.value)}   placeholder=' Name'/>
                </div>
                <div>
                    <AiOutlineMail/>
                    <input type="email" name="email" id=""  value={userMail} onChange={(e)=>setUserMail(e.target.value)}  placeholder=' Email '/>
                </div>
                
                <div>
                <FaUserSecret/>
                <select name="catagory" value={userRole} onChange={(e)=>setUserRole(e.target.value)} id="" required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    
                </select>
                </div>
               
                <div style={{border:'none'}}>
              <button className='ad_create_btn'>Update</button>
                </div>
            </form>
        </div>}
    </div>
    </>
  )
}
