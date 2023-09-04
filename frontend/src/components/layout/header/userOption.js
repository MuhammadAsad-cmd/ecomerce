import React, { useState } from 'react'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import './header.css'
import  Backdrop  from '@material-ui/core/Backdrop'
import {AiOutlineUser,AiOutlineLogout} from "react-icons/ai"
import {FaTh,FaUser} from "react-icons/fa"


import {BiCart,BiGrid} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser, logoutUserAction } from '../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

export let UserOption=()=>{
    let alert=useAlert()
    let navigate=useNavigate()
   let [open,setOpen]= useState(false);
   let {user}=useSelector((e)=>e.loadUserReducer)
   let {cart}=useSelector((e)=>e.CartReducer)
  let dispatch= useDispatch()

  let profileFn=() => navigate('/account')
  let ordersFn=() => navigate('/user/orders')
  let CartFn=() =>  navigate('/user/cart')
  let dashboardFn=() => navigate('/admin/dashboard')
  let logoutFn=() => { 
dispatch(logOutUser());
localStorage.clear();
// clearCookie('token');
alert.success("logout Successfully")
//  navigate('/login')
dispatch(logoutUserAction())
window.location.href='/login'

   }
   let SpeedDialIconsList=[
    {icon:<FaUser/>,name:"Profile",fn:profileFn},
    {icon:<FaTh/>,name:"Orders",fn:ordersFn},
    
    {icon:<BiCart/>,name:`Cart:${cart.length}`,fn:CartFn},
    {icon:<AiOutlineLogout/>,name:"Logout" ,fn:logoutFn},
  ];
  // console.log(user);
if (user.role==='admin') {

  SpeedDialIconsList.splice(2,0,{icon:<BiGrid/>,name:"Dashboard",fn:dashboardFn})
}
    return(
        <>
        {/* {console.log(user)} */}
        <Backdrop open={open} style={{opacity:0.6,zIndex:22}}/>
        <SpeedDial className='userPicSec' style={{position:'absolute',right:'12px',top:'20px'}}  ariaLabel="SpeedDial basic example"
  onOpen={()=>setOpen(true)}
  onClose={()=>setOpen(false)}
  open={open}
  icon={<img src={user.avatar[0].url } alt='img'/> || <AiOutlineUser/>} direction='down'>
    {
        SpeedDialIconsList.map((el)=>{
return (
<SpeedDialAction className='SpeedDialAction' key={el.name} icon={el.icon} tooltipTitle={el.name} onClick={el.fn} tooltipOpen={true} />
          )  })
    }

  

        </SpeedDial>
        </>
    )
}