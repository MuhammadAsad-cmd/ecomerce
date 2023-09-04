import { ADMIN_DEL_PRO_CLEAR_ERR_SMS } from '../constants/productConst';
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
    LOGOUT_REQUEST,
    PROFILE_UPDATE_REQUEST_FAILED,
    PROFILE_UPDATE_REQUEST_SUCCESSFULLY,
    PROFILE_UPDATE_REQUEST,
    CHANGE_PASS_REQUEST_FAILED,
    CHANGE_PASS_REQUEST_SUCCESSFULLY,
    CHANGE_PASS_REQUEST,
    FORGET_PASS_REQUEST_FAILED,
    FORGET_PASS_REQUEST,
    FORGET_PASS_REQUEST_SUCCESSFULLY,
    RESET_PASS_REQUEST,
    RESET_PASS_REQUEST_SUCCESSFULLY,
    RESET_PASS_REQUEST_FAILED,
    ADMIN_LOAD_ALL_USER_REQ,
    ADMIN_LOAD_ALL_USER_SUCC,
    ADMIN_LOAD_ALL_USER_FAIL,
    ADMIN_DELETE_USER_REQ,
    ADMIN_DELETE_USER_SUCC,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_LOAD_USER_REQ,
    ADMIN_LOAD_USER_SUCC,
    ADMIN_LOAD_USER_FAIL,
    ADMIN_UPDATE_USER_REQ,
    ADMIN_UPDATE_USER_SUCC,
    ADMIN_UPDATE_USER_FAIL
    
} from '../constants/userConst'
let initialState = {};
// load me
export let userReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { loading: true }
        case LOGIN_REQUEST_SUCCESSFULLY:
            // console.log(payload);
            return { user: payload.user, loading: false, sms: payload.sms, isAuthentic: payload.isAuthentic }

        case LOGIN_REQUEST_FAILED:
            // console.log(payload);

            return { loading: false, error: payload.response?.data.sms || payload.message }
        //logout user

        case LOGOUT_REQUEST:
            return { loading: true }
        case LOGOUT_REQUEST_SUCCESSFULLY:
            return { loading: false, sms: payload.sms }

        case LOGOUT_REQUEST_FAILED:
            return { loading: false, error: payload.response?.data.sms || payload.message }
            
        //register user
        case REGISTER_REQUEST: return { loading: true }
        case REGISTER_REQUEST_SUCCESSFULLY:
            return { user: payload.user, sms:payload.sms,loading: false }
        case REGISTER_REQUEST_FAILED:
            // console.log(payload.response.data.sms);
            return {  error: payload.response?.data.sms || payload.message, loading: false }

            case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
                return {...state,error:null,sms:null}
        default: return state

    }

}

//load user reducer single user
export let loadUserReducer = (state = {isAuthentic:true}, { payload, type }) => {
    switch (type) {
        case LOAD_USER:
            //     console.log("ok");
            return {...state, loading: true }
        case USER_LOADED_SUCCESSFULLY:
            // console.log(payload);
            return {...state, user: payload.user,isAuthentic:true,loading: false }

        case USER_LOADED_FAILED:
            console.log(payload);
            return {...state, loading: false, error: payload.response?.data.sms || payload.message,isAuthentic:false }

        default: return state

    }

}

//UPDATE profile user 
export let updateProfileReducer=(state={},{payload,type})=>{

    switch(type){
        case PROFILE_UPDATE_REQUEST:return {loading:true}
        case PROFILE_UPDATE_REQUEST_SUCCESSFULLY:return{loading:false,sms:payload.sms} 
        case PROFILE_UPDATE_REQUEST_FAILED:return{loading:false, error: payload.response?.data.sms || payload.message}
        case ADMIN_DEL_PRO_CLEAR_ERR_SMS:return {...state,error:null,sms:null}
        default :return state
    }

}

// change password reducer
export let updatePasswordReducer=(state={},{type,payload})=>{
    switch(type){
        case CHANGE_PASS_REQUEST:return {loading:true}
        case CHANGE_PASS_REQUEST_SUCCESSFULLY:return {loading:false,sms:payload.sms}
        case CHANGE_PASS_REQUEST_FAILED:return {loading:false,error:payload.response?.data.sms || payload.message}
        default :return state
    }
}

//forget Password
export let forgetPasswordReducer=(state={},{payload,type})=>{

    switch(type){
        case FORGET_PASS_REQUEST:return {loading:true}
        case FORGET_PASS_REQUEST_SUCCESSFULLY:return {loading:false,sms:payload.sms,message:payload.message}
        case FORGET_PASS_REQUEST_FAILED:return {loading:false,error:payload.response?.data.sms || payload.message}
    default :return state
    }
}
//reset password
export let resetPasswordReducer=(state={},{payload,type})=>{

    switch(type){
        case RESET_PASS_REQUEST:return {loading:true}
        case RESET_PASS_REQUEST_SUCCESSFULLY:
            // console.log();
            return {loading:false,sms:payload.sms,message:payload.message}
        case RESET_PASS_REQUEST_FAILED:return {loading:false,error:payload.response?.data.sms || payload.message}
    default :return state
    }
}

// admin load all user
export let loadAllUserReducer = (state = {users:[]}, { payload, type }) => {
    switch (type) {
        case ADMIN_LOAD_ALL_USER_REQ:
            //     console.log("ok");
            return {...state, loading: true }
        case ADMIN_LOAD_ALL_USER_SUCC:
            // console.log(payload);
            return {...state, users: payload.users, loading: false }

        case ADMIN_LOAD_ALL_USER_FAIL:
            // console.log(payload);
            return {...state, loading: false, error: payload.response?.data.sms || payload.message }

        default: return state

    }

}
// admin load all user
export let adminDeleteUserReducer = (state = {}, { payload, type }) => {
    switch (type) {
        case ADMIN_DELETE_USER_REQ:
            //     console.log("ok");
            return {...state, loading: true }
        case ADMIN_DELETE_USER_SUCC:
            // console.log(payload);
            return {...state, user: payload.user,sms:payload.sms, loading: false }

        case ADMIN_DELETE_USER_FAIL:
            // console.log(payload);
            return {...state, loading: false, error: payload.response?.data.sms || payload.message }
            case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
                return {...state,error:null,sms:null}
                
        default: return state

    }

}
// admin load a user by its id
export let adminLoadUserReducer = (state = {user:{}}, { payload, type }) => {
    switch (type) {
        case ADMIN_LOAD_USER_REQ:
            //     console.log("ok");
            return {...state, loading: true }
        case ADMIN_LOAD_USER_SUCC:
            // console.log(payload);
            return {...state, user: payload.user,sms:payload.sms, loading: false }

        case ADMIN_LOAD_USER_FAIL:
            // console.log(payload);
            return {...state, loading: false, error: payload.response?.data.sms || payload.message }
            case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
                return {...state,error:null,sms:null}
                
        default: return state

    }

}

// admin load a user by its id
export let adminUpdateUserReducer = (state = {user:{}}, { payload, type }) => {
    switch (type) {
        case ADMIN_UPDATE_USER_REQ:
            //     console.log("ok");
            return {...state, loading: true }
        case ADMIN_UPDATE_USER_SUCC:
            // console.log(payload);
            return {...state, user: payload.user,sms:payload.sms, loading: false }

        case ADMIN_UPDATE_USER_FAIL:
            // console.log(payload);
            return {...state, loading: false, error: payload.response?.data.sms || payload.message }
            case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
                return {...state,error:null,sms:null}
                
        default: return state

    }

}
