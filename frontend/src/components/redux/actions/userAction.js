import {
    USER_LOADED_FAILED,
    USER_LOADED_SUCCESSFULLY,
    LOAD_USER,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESSFULLY,
    LOGIN_REQUEST,
    REGISTER_REQUEST_FAILED,
    REGISTER_REQUEST_SUCCESSFULLY,
    REGISTER_REQUEST,
    LOGOUT_REQUEST_FAILED,
    LOGOUT_REQUEST_SUCCESSFULLY,
    PROFILE_UPDATE_REQUEST_FAILED,
    PROFILE_UPDATE_REQUEST_SUCCESSFULLY,
    PROFILE_UPDATE_REQUEST,
    CHANGE_PASS_REQUEST_FAILED,
    CHANGE_PASS_REQUEST_SUCCESSFULLY,
    CHANGE_PASS_REQUEST,
    FORGET_PASS_REQUEST,
    FORGET_PASS_REQUEST_FAILED,
    FORGET_PASS_REQUEST_SUCCESSFULLY,
    RESET_PASS_REQUEST,
    RESET_PASS_REQUEST_FAILED,
    RESET_PASS_REQUEST_SUCCESSFULLY,
    ADMIN_LOAD_ALL_USER_REQ,
    ADMIN_LOAD_ALL_USER_SUCC,
    ADMIN_LOAD_ALL_USER_FAIL,
    ADMIN_DELETE_USER_REQ,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_DELETE_USER_SUCC,
    ADMIN_LOAD_USER_REQ,
    ADMIN_LOAD_USER_SUCC,
    ADMIN_LOAD_USER_FAIL,
    ADMIN_UPDATE_USER_REQ,
    ADMIN_UPDATE_USER_SUCC,
    ADMIN_UPDATE_USER_FAIL,
    LOGOUT_USER_REQUEST
} from '../constants/userConst'
import axios from 'axios'
export let login=(formData)=>async (dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        let headerInfo={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        }
        

        let {data}= await axios.post(`http://localhost:1300/api/v1/user/login`,formData,headerInfo)
        // console.log(data);
        dispatch({type:LOGIN_REQUEST_SUCCESSFULLY,payload:data})
    } catch (error) {
        dispatch({type:LOGIN_REQUEST_FAILED,payload:error})
        // console.log(error)
    }
}

// /register user
export let registerUserAction=(formData)=>async (dispatch)=>{
    try {
        // formData.ok=[formData.avatar,formData.avatar]
        dispatch({type:REGISTER_REQUEST});
        let headerInfo={
            headers:{'Content-type':"multipart/form-data"},
            withCredentials:true
        }
        
        let {data}= await axios.post(`http://localhost:1300/api/v1/user/register`,formData,headerInfo)
        // console.log(data);
        dispatch({type:REGISTER_REQUEST_SUCCESSFULLY,payload:data})
    } catch (error) {
        dispatch({type:REGISTER_REQUEST_FAILED,payload:error})
        // console.log(error)
    }
}
export let updateProfileAction=(formData)=>async(dispatch)=>{
    try{
dispatch({type:PROFILE_UPDATE_REQUEST});
let options={
    headers:{
        "Content-type":"multipart/form-data"
    },
    withCredentials:true
}
let {data}=await axios.post('http://localhost:1300/api/v1/user/me/update',formData,options)
dispatch({type:PROFILE_UPDATE_REQUEST_SUCCESSFULLY,payload:data})
    }catch(error){
        dispatch({type:PROFILE_UPDATE_REQUEST_FAILED,payload:error})
    }
}
//LOAD USER or load me 
export let loadUser=()=>async (dispatch)=>{
    try {
        dispatch({type:LOAD_USER});

        
        let {data}= await axios.get(`http://localhost:1300/api/v1/user/me`,{withCredentials:true})
        // console.log(data);
        dispatch({type:USER_LOADED_SUCCESSFULLY,payload:data})
    } catch (error) {
        dispatch({type:USER_LOADED_FAILED,payload:error})
        // console.log(error.response.data.sms)
    }
}

//LOGOUT USER
export let logOutUser=()=>async (dispatch)=>{
    try {
      

        
        let {data}= await axios.get(`http://localhost:1300/api/v1/user/logout`,{withCredentials:true})
        // console.log(data);
        dispatch({type:LOGOUT_REQUEST_SUCCESSFULLY,payload:data})
    } catch (error) {
        dispatch({type:LOGOUT_REQUEST_FAILED,payload:error})
        // console.log(error.response.data.sms)
    }
}
//change password
export let changePasswordAction=(formData)=>async(dispatch)=>{
try{
dispatch({type:CHANGE_PASS_REQUEST});
let headerInfo={
    headers:{'Content-type':"application/json"},
    withCredentials:true
}
let {data}=await axios.post('http://localhost:1300/api/v1/user/password/update',formData,headerInfo)
dispatch({type:CHANGE_PASS_REQUEST_SUCCESSFULLY,payload:data})
}catch(error){
    dispatch({type:CHANGE_PASS_REQUEST_FAILED,payload:error})
}

}

// forget password 
export let forgetpasswordAction=(email)=>async(dispatch)=>{
    try{
dispatch({type:FORGET_PASS_REQUEST})
let headerInfo={
    "Content-type":"application/json",
    withCredentials:true
}
let {data} =await axios.post('http://localhost:1300/api/v1/user/password/forget',{email},headerInfo) 
dispatch({type:FORGET_PASS_REQUEST_SUCCESSFULLY,payload:data})
    }catch(error){
        dispatch({type:FORGET_PASS_REQUEST_FAILED,payload:error})

    }
}

//reset passwor 
export let resetPasswordAction=(userData)=>async(dispatch)=>{
    try {
        dispatch({type:RESET_PASS_REQUEST})
        let {token,newPassword,repeatPassword}=userData;
        console.log(token);
        let headerInfo={
            "Content-type":'application/json',
            withCredentials:true
        }
        let {data}=await axios.post(`http://localhost:1300/api/v1/user/password/reset/${token}`,{newPassword,repeatPassword},headerInfo)
        dispatch({type:RESET_PASS_REQUEST_SUCCESSFULLY,payload:data})
    } catch (error) {
        dispatch({type:RESET_PASS_REQUEST_FAILED,payload:error})
    }

}

// ADMIN LOAD ALL USER
export let AdminAllUserAction=()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_LOAD_ALL_USER_REQ})
       
       
        let {data}=await axios.get(`http://localhost:1300/api/v1/user/admin/alluser`,{withCredentials:true})
        dispatch({type:ADMIN_LOAD_ALL_USER_SUCC,payload:data})
    } catch (error) {
        dispatch({type:ADMIN_LOAD_ALL_USER_FAIL,payload:error})
    }

}

// Admin delete orderr action 
export let adminDeleteUserAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_DELETE_USER_REQ});

        let {data} = await axios.delete(`http://localhost:1300/api/v1/user/admin/user/${id}`,{withCredentials:true});
        console.log(data);
        dispatch({type:ADMIN_DELETE_USER_SUCC,payload:data})
        
    } catch (error) {
        dispatch({type:ADMIN_DELETE_USER_FAIL,payload:error})
    }

}

// Admin load a single user by its id action 
export let adminLoadUserAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_LOAD_USER_REQ});

        let {data} = await axios.get(`http://localhost:1300/api/v1/user/admin/user/${id}`,{withCredentials:true});
        console.log(data);
        dispatch({type:ADMIN_LOAD_USER_SUCC,payload:data})
        
    } catch (error) {
        dispatch({type:ADMIN_LOAD_USER_FAIL,payload:error})
    }

}

// update  user DETAIL by admin
export let updateUserAction=(formData,id)=>async (dispatch)=>{

    try{
        let headerInfo={
            headers:{'Content-Type':"multipart/form-data"
          
        },
            withCredentials:true
        }
        
        dispatch({type:ADMIN_UPDATE_USER_REQ})
let {data} =await axios.put(`http://localhost:1300/api/v1/user/admin/user/${id}`,formData,headerInfo)

        dispatch({type:ADMIN_UPDATE_USER_SUCC,payload:data})


    }catch(error){
        dispatch({type:ADMIN_UPDATE_USER_FAIL,payload:error})
    }
}

// logout user
export let logoutUserAction=()=>async (dispatch)=>{

    try{
    
        
        // dispatch({type:LOGOUT_USER_REQUEST})
let {data} =await axios.get(`http://localhost:1300/api/v1/user/logout`,{withCredentials:true})

        // dispatch({type:LOGOUT_USER_REQUEST_SUC,payload:data})


    }catch(error){
        // dispatch({type:LOGOUT_USER_REQUEST_FAIL,payload:error})
    }
}