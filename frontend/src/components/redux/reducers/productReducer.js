import {  LOAD_ALL_PRODUCTS, LOAD_ALL_PRODUCTS_FAILD, LOAD_ALL_PRODUCTS_SUCCESS, LOAD_SINGLE_PRODUCT, LOAD_SINGLE_PRODUCT_FAILD, LOAD_SINGLE_PRODUCT_SUCCESS ,CLEAR_ERRORD, SUBMIT_PRODUCT_REVIEW, SUBMIT_PRODUCT_REVIEW_SUCCESS, SUBMIT_PRODUCT_REVIEW_FAILD, CLEAR_SMS, ADMIN_LOAD_ALL_PRODUCTS, ADMIN_LOAD_ALL_PRODUCTS_SUCCESS, ADMIN_LOAD_ALL_PRODUCTS_FAILD, ADMIN_DELETE_PRODUCT, ADMIN_DELETE_PRODUCT_FAILD, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DEL_PRO_CLEAR_ERR_SMS, ADD_NEW_PRODUCT_REQ, ADD_NEW_PRODUCT_SUCC, ADD_NEW_PRODUCT_FAIL, UPDATE_PRODUCT_REQ, UPDATE_PRODUCT_SUCC, UPDATE_PRODUCT_FAIL, ADMIN_DEL_PRODUCT_REVIEW_REQ, ADMIN_DEL_PRODUCT_REVIEW_SUCC, ADMIN_DEL_PRODUCT_REVIEW_FAIL} from "../constants/productConst"

let initialState = []
export let productReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case LOAD_ALL_PRODUCTS:
            return {loading:true}

            case LOAD_ALL_PRODUCTS_SUCCESS:
                // console.log(payload.products);
            return {products:payload.products,productCount:payload.productCount,limitProduct:payload.limitProduct ,loading:false}
            case LOAD_ALL_PRODUCTS_FAILD:
            return {loading:false,error: payload.response?.data.sms || payload.message,statusCode:payload.response?.status || 400 }
            case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
                return {error:null,sms:null}

           
        default: return  state 
    }
}
export let productDetailReducer=(state={product:{}},{type,payload})=>{
    switch (type) {
       //SINGLE PRODUCT
       case LOAD_SINGLE_PRODUCT:
        return {...state,loading:true}

        case LOAD_SINGLE_PRODUCT_SUCCESS:
        return {...state,product:payload ,loading:false}

        case LOAD_SINGLE_PRODUCT_FAILD:
            return {...state,loading:false,error: payload.response?.data.sms || payload.message,statusCode:payload.response?.status || 400}
    
        default: return state;
    }

}

// product review
export let productReviewReducer=(state={sms:null},{payload,type})=>{

    switch (type) {
        case SUBMIT_PRODUCT_REVIEW:
            return {...state,loading:true}
        case CLEAR_SMS:
            
            return {...state,sms:null}
            case SUBMIT_PRODUCT_REVIEW_SUCCESS:
                return {...state,loading:false,sms:payload.sms}
                case SUBMIT_PRODUCT_REVIEW_FAILD:
                    return {...state,loading:false,error: payload.response?.data.sms || payload.message}
                    case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return {...state,error:null,sms:null}
        default:
           return {...state}
    }

}


// admin load all products
export let AdminProductsReducer=(state = {products:[]}, { type, payload }) => {

    switch (type) {
        case ADMIN_LOAD_ALL_PRODUCTS:
            return {...state,loading:true}

            case ADMIN_LOAD_ALL_PRODUCTS_SUCCESS:
                // console.log(payload.products);
            return {...state,products:payload.products,loading:false}
            case ADMIN_LOAD_ALL_PRODUCTS_FAILD:
            return {...state,loading:false,error: payload.response?.data.sms || payload.message}
           case CLEAR_ERRORD:
            return {error:null}

           
        default: return  state 
    }
}
// delete product
export let AdminDelProductReducer=(state = {}, { type, payload }) => {

    switch (type) {
        case ADMIN_DELETE_PRODUCT:
            return {...state,loading:true}

            case ADMIN_DELETE_PRODUCT_SUCCESS:
                // console.log(payload);
            return {...state,sms:payload.sms,loading:false}
            case ADMIN_DELETE_PRODUCT_FAILD:
            return {...state,loading:false,error: payload.response?.data.sms || payload.message}
           case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return {...state,error:null,sms:null}
            
           
        default: return state 
    }
}
//add new product reducer
export let AddNewProductReducer=(state = {loading:false}, { type, payload }) => {

    switch (type) {
        case ADD_NEW_PRODUCT_REQ:
        case UPDATE_PRODUCT_REQ:
            console.log('req');
            return { ...state, loading: true };
    
        case ADD_NEW_PRODUCT_SUCC:
        case UPDATE_PRODUCT_SUCC:
            console.log(payload);
            return { ...state, sms: payload.sms, loading: false };
    
        case ADD_NEW_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            console.log(payload);
            return {
                ...state,
                loading: false,
                error: payload.response?.data.sms || payload.message
            };
    
        case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return { ...state, error: null, sms: null };
    
        default:
            return state;
    }
    
}

// delete product review 
export let AdminDelProReviewReducer=(state = {}, { type, payload }) => {

    switch (type) {
        case ADMIN_DEL_PRODUCT_REVIEW_REQ:
            return {...state,loading:true}

            case ADMIN_DEL_PRODUCT_REVIEW_SUCC:
                // console.log(payload);
            return {...state,sms:payload.sms,loading:false}
            case ADMIN_DEL_PRODUCT_REVIEW_FAIL:
            return {...state,loading:false,error: payload.response?.data.sms || payload.message}
           case ADMIN_DEL_PRO_CLEAR_ERR_SMS:
            return {...state,error:null,sms:null}
            
           
        default: return state 
    }
}