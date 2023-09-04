import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'
import {  logOutUser } from './components/redux/actions/userAction'
import Loader from './components/layout/loader/loader'


export function PrivateComponent() {

    let {isAuthentic,loading}=useSelector((e)=>e.loadUserReducer)


if (!loading) {
    
    return isAuthentic ? <Outlet /> : <Navigate to="/login" />;
}else{
    return <Loader/>
}
  
 



}


// is admin checking
export function IsAdmin() {
    let dispatch=useDispatch()
    let {user,loading}=useSelector((e)=>e.loadUserReducer)

    if (loading === false) {
        
    if (user.role==='admin') {
      return(  <Outlet/>)
    } else {
        dispatch(logOutUser());
       window.location.href='/login'
    }
 
    }else{
       return <Loader/>
    }


}