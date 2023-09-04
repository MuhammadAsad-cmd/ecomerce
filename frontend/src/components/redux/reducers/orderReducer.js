import { ADMIN_DEL_PRO_CLEAR_ERR_SMS } from "../constants/productConst"

const { NEW_ORDER_REQUST, FAILD_NEW_ORDER, SUCCESS_NEW_ORFDER, GET_ORDER_REQUSET, GET_ORDER_REQUSET_FAIL, GET_ORDER_REQUSET_SUCCESS, GET_ORDER_DETAIL_REQUSET, GET_ORDER_DETAIL_REQUSET_SUCCESS, GET_ORDER_DETAIL_REQUSET_FAIL, ADMIN_ALL_ORDER_REQ, ADMIN_ALL_ORDER_SUCC, ADMIN_ALL_ORDER_FAIL, ADMIN_DELETE_ORDER_REQ, ADMIN_DELETE_ORDER_SUCC, ADMIN_DELETE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQ, ADMIN_UPDATE_ORDER_SUCC, ADMIN_UPDATE_ORDER_FAIL } = require("../constants/orderConst")
export let createOrderReducer=(state={},{type,payload})=>{

switch(type){

    case NEW_ORDER_REQUST:{
        return {...state,loading:true}
    }
    case SUCCESS_NEW_ORFDER:{
        return {...state,loading:false,order:payload.order,sms:payload.sms}
    }
    case FAILD_NEW_ORDER:{
        return {...state,loading:false,error: payload.response?.data.sms || payload.message}
    }
    case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
        return {...state,error:null,sms:null}
        
    default: return state
}
}

//get all my orders
export let getAllMyOrdersReducer=(state={orders:[]},{type,payload})=>{

    switch(type){
    
        case GET_ORDER_REQUSET:{
            return {...state,loading:true}
        }
        case GET_ORDER_REQUSET_SUCCESS:{
            return {...state,loading:false,orders:payload.orders}
        }
        case GET_ORDER_REQUSET_FAIL:{
            return {...state,loading:false,error: payload.response?.data.sms || payload.message}
        }
        default: return state
    }
    }

export let getOrderDetailReducer=(state={order:{},loading:true},{type,payload})=>{

        switch(type){
        
            case GET_ORDER_DETAIL_REQUSET:{
                return {...state,loading:true}
            }
            case GET_ORDER_DETAIL_REQUSET_SUCCESS:{
                
                return {...state,loading:false,order:payload.order}
            }
            case GET_ORDER_DETAIL_REQUSET_FAIL:{
                return {...state,loading:false,error: payload.response?.data.sms || payload.message}
            }
            default: return state
        }
        }

        // admin get all orders of all users
  export let adminAllOrderReducer=(state={orders:[]},{type,payload})=>{

            switch(type){
            
                case ADMIN_ALL_ORDER_REQ:{
                    return {...state,loading:true}
                }
                case ADMIN_ALL_ORDER_SUCC:{
                   
                    return {...state,loading:false,orders:payload.orders}
                }
                case ADMIN_ALL_ORDER_FAIL:{
                    return {...state,loading:false,error: payload.response?.data.sms || payload.message}
                }
                default: return state
            }
            }

// admin delete an order by its id
export let adminDeleteOrderReducer=(state={},{type,payload})=>{

switch (type) {
    case ADMIN_DELETE_ORDER_REQ:
        return {...state,loading:true}
       case ADMIN_DELETE_ORDER_SUCC:
        return {...state,loading:false,sms:payload.sms}
       case ADMIN_DELETE_ORDER_FAIL:
        return {...state,loading:false,error: payload.response?.data.sms || payload.message}
        case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return {...state,error:null,sms:null}
            
           
            default: return state 
}
}

//admin delete an order
export let AdminUpdateOrderReducer=(state={},{type,payload})=>{

    switch(type){
    
        case ADMIN_UPDATE_ORDER_REQ:{
            return {...state,loading:true}
        }
        case ADMIN_UPDATE_ORDER_SUCC:{
            
            return {...state,loading:false,sms:payload.sms}
        }
        case ADMIN_UPDATE_ORDER_FAIL:{
            return {...state,loading:false,error: payload.response?.data.sms || payload.message}
        }
        case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return {...state,error:null,sms:null}
        default: return state
    }
    }