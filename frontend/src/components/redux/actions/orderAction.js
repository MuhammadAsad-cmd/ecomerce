import axios from 'axios'
const { NEW_ORDER_REQUST, FAILD_NEW_ORDER, SUCCESS_NEW_ORFDER, GET_ORDER_REQUSET, GET_ORDER_REQUSET_SUCCESS, GET_ORDER_REQUSET_FAIL, GET_ORDER_DETAIL_REQUSET, GET_ORDER_DETAIL_REQUSET_SUCCESS, GET_ORDER_DETAIL_REQUSET_FAIL, ADMIN_ALL_ORDER_SUCC, ADMIN_ALL_ORDER_FAIL, ADMIN_ALL_ORDER_REQ, ADMIN_DELETE_ORDER_REQ, ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_SUCC, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQ, ADMIN_UPDATE_ORDER_SUCC } = require("../constants/orderConst")

export let newOrderAction=(order)=>async(dispatch)=>{
    
    try {
        dispatch({ type:NEW_ORDER_REQUST })
        let headerInfo={
            "Content-type":"application/json",
            withCredentials:true
        }
        
        let {data}=await axios.post('http://localhost:1300/api/v1/order/new',order,headerInfo)
      
        dispatch({
            type:SUCCESS_NEW_ORFDER,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:FAILD_NEW_ORDER,
            payload:error
        })
    }
  

}

// GETTING all ORDERS  OF SINFLE USER

export let getOrderAction=()=>async (dispatch)=>{
    try {
        dispatch({type:GET_ORDER_REQUSET})
        let headerInfo={
            withCredentials:true
        }
        
       let {data} =await axios.get('http://localhost:1300/api/v1/order/me/orders',headerInfo)
    //    console.log(data);
       dispatch({type:GET_ORDER_REQUSET_SUCCESS,payload:data})
    } catch (error) {
       dispatch({type:GET_ORDER_REQUSET_FAIL,payload:error})

        
    }
}
// get order detail of single order
export let orderDetailAction=(id)=>async (dispatch)=>{
    try {
        dispatch({type:GET_ORDER_DETAIL_REQUSET});
        let headerInfo={
            "Content-type":"application/json",
            withCredentials:true
        }
        let {data} = await axios.get(`http://localhost:1300/api/v1/order/${id}`,headerInfo);
        // console.log(data);

        dispatch({type:GET_ORDER_DETAIL_REQUSET_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:GET_ORDER_DETAIL_REQUSET_FAIL,payload:error})
        
    }

}

// ADMIN GET ALL ORDER of all users
export let adminAllOrderAction=()=>async (dispatch)=>{
    try {
        dispatch({type:ADMIN_ALL_ORDER_REQ})
        let headerInfo={
            withCredentials:true
        }
        
       let {data} =await axios.get('http://localhost:1300/api/v1/order/admin/orders',headerInfo)
    //    console.log(data);
       dispatch({type:ADMIN_ALL_ORDER_SUCC,payload:data})
    } catch (error) {
       dispatch({type:ADMIN_ALL_ORDER_FAIL,payload:error})

        
    }
}

// Admin delete orderr action
export let adminDeleteOrderAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_DELETE_ORDER_REQ});

        let {data} = await axios.delete(`http://localhost:1300/api/v1/order/admin/${id}`,{withCredentials:true});
        console.log(data);
        dispatch({type:ADMIN_DELETE_ORDER_SUCC,payload:data})
        
    } catch (error) {
        dispatch({type:ADMIN_DELETE_ORDER_FAIL,payload:error})
    }

}

// update order  status by admin
export let orderUpdateAction=(orderStatus,id)=>async(dispatch)=>{

    try {
        dispatch({type:ADMIN_UPDATE_ORDER_REQ})
        let headerInfo={
            Headers:{
                "Content-type":'application/json'
            },
            withCredentials:true
        }
        let {data} =await axios.post(`http://localhost:1300/api/v1/order/admin/${id}`,{orderStatus},headerInfo)
        dispatch({type:ADMIN_UPDATE_ORDER_SUCC,payload:data})
    } catch (error) {
        dispatch({type:ADMIN_UPDATE_ORDER_FAIL,payload:error})
        
    }
}