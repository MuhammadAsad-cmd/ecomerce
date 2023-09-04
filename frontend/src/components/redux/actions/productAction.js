import { LOAD_ALL_PRODUCTS, LOAD_ALL_PRODUCTS_FAILD, LOAD_ALL_PRODUCTS_SUCCESS, LOAD_SINGLE_PRODUCT, LOAD_SINGLE_PRODUCT_FAILD, LOAD_SINGLE_PRODUCT_SUCCESS, CLEAR_ERRORD,CLEAR_SMS, SUBMIT_PRODUCT_REVIEW, SUBMIT_PRODUCT_REVIEW_SUCCESS, SUBMIT_PRODUCT_REVIEW_FAILD, ADMIN_LOAD_ALL_PRODUCTS_FAILD, ADMIN_LOAD_ALL_PRODUCTS, ADMIN_LOAD_ALL_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCT, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAILD, ADMIN_DEL_PRO_CLEAR_ERR_SMS, ADD_NEW_PRODUCT_REQ, ADD_NEW_PRODUCT_SUCC, ADD_NEW_PRODUCT_FAIL, UPDATE_PRODUCT_REQ, UPDATE_PRODUCT_SUCC, UPDATE_PRODUCT_FAIL, ADMIN_DEL_PRODUCT_REVIEW_REQ, ADMIN_DEL_PRODUCT_REVIEW_SUCC, ADMIN_DEL_PRODUCT_REVIEW_FAIL } from '../constants/productConst'
import axios from 'axios'

//get all products
export let getAllProducts=(arg)=> async(dispatch)=>{
try {
//   

let {nameOfProducts,activepage,priceSliderVal,catagory,ratingSliderVal}=arg;
    dispatch({type:LOAD_ALL_PRODUCTS});

    let apiUrl;

    if (catagory) {
//    console.log(catagory);
        
         apiUrl=`http://localhost:1300/api/v1/products/?page=${activepage || 1}&gte=${priceSliderVal[0] || 0}&lte=${priceSliderVal[1] || 1000000}&catagory=${catagory.toLowerCase()}&ratingGte=${ratingSliderVal[0]}&ratingLte=${ratingSliderVal[1]}`
    }else{
       
        apiUrl=`http://localhost:1300/api/v1/products/?name=${nameOfProducts || ''}&page=${activepage || 1}&gte=${priceSliderVal[0] || 0}&lte=${priceSliderVal[1] || 1000000}&ratingGte=${ratingSliderVal[0]}&ratingLte=${ratingSliderVal[1]}`

    }
    let {data}=await axios.get(apiUrl,{withCredentials:true});
    
     dispatch({type:LOAD_ALL_PRODUCTS_SUCCESS,payload:data})
    
} catch (error) {
    dispatch({type:LOAD_ALL_PRODUCTS_FAILD,payload:error})
    // console.log(error.response.status);
}

}

//get all products
export let getFeaturedProducts=(arg)=> async(dispatch)=>{
    try {   
     dispatch({type:LOAD_ALL_PRODUCTS});
     
            let apiUrl=`http://localhost:1300/api/v1/products`
   
        let {data}=await axios.get(apiUrl,{withCredentials:true});
        
         dispatch({type:LOAD_ALL_PRODUCTS_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:LOAD_ALL_PRODUCTS_FAILD,payload:error})
       
    }
    
    }

//get single product detail

export let productDetail=(id)=> async (dispatch)=>{
    try{
 dispatch({type:LOAD_SINGLE_PRODUCT})
 let {data} =await axios.get(`http://localhost:1300/api/v1/products/product/${id}`,{withCredentials:true})
// console.log(data);
 dispatch({type:LOAD_SINGLE_PRODUCT_SUCCESS,payload:data.product})
    }catch(error){
dispatch({type:LOAD_SINGLE_PRODUCT_FAILD,payload:error})
    }
}

// sumit prodct review
export let submitProductReview=(review)=>async (dispatch)=>{
    try {
        dispatch({type:SUBMIT_PRODUCT_REVIEW});
        let headerInfo={
            "Content-type":'application/json',
            withCredentials:true
        }
        let {data} =await axios.post('http://localhost:1300/api/v1/products/review',review,headerInfo);
        
        dispatch({type:SUBMIT_PRODUCT_REVIEW_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:SUBMIT_PRODUCT_REVIEW_FAILD,payload:error})
        
    }

}
export let clearErrors=()=> async (dispatch)=>{
    dispatch({type:CLEAR_ERRORD})
}
export let clearsms=()=>async (dispatch)=>{
    dispatch({type:CLEAR_SMS})
}


// admin action start from here

export let AdminLoadAllProducts=()=>async (dispatch)=>{

    try{
        dispatch({type:ADMIN_LOAD_ALL_PRODUCTS})
let {data} =await axios.get('http://localhost:1300/api/v1/products/admin/products',{withCredentials:true})

        dispatch({type:ADMIN_LOAD_ALL_PRODUCTS_SUCCESS,payload:data})


    }catch(error){
        dispatch({type:ADMIN_LOAD_ALL_PRODUCTS_FAILD,payload:error})
    }
}
// admin delte product
export let AdminDelProductAction=(id)=>async (dispatch)=>{

    try{
        dispatch({type:ADMIN_DELETE_PRODUCT})
let {data} =await axios.delete(`http://localhost:1300/api/v1/products/admin/${id}`,{withCredentials:true})

        dispatch({type:ADMIN_DELETE_PRODUCT_SUCCESS,payload:data})


    }catch(error){
        dispatch({type:ADMIN_DELETE_PRODUCT_FAILD,payload:error})
    }
}
// this action use to clear sms and error
export let AdminDelClearSms_error=()=>async (dispatch)=>{
    dispatch({type:ADMIN_DEL_PRO_CLEAR_ERR_SMS})
}
// add new product
export let AddNewProductAction=(formData)=>async (dispatch)=>{
    dispatch({type:ADD_NEW_PRODUCT_REQ})
    try{
        let headerInfo={
            headers:{'Content-Type':"multipart/form-data"
          
        },
            withCredentials:true
        }
        
        
let {data} =await axios.post(`http://localhost:1300/api/v1/products/admin/new`,formData,headerInfo)

        dispatch({type:ADD_NEW_PRODUCT_SUCC,payload:data})


    }catch(error){
        dispatch({type:ADD_NEW_PRODUCT_FAIL,payload:error})
    }
}
// update  product
export let updateProductAction=(formData,id)=>async (dispatch)=>{
  console.log('');
    try{
        let headerInfo={
            headers:{'Content-Type':"multipart/form-data"
          
        },
            withCredentials:true
        }
        
        dispatch({type:UPDATE_PRODUCT_REQ})
let {data} =await axios.put(`http://localhost:1300/api/v1/products/admin/${id}`,formData,headerInfo)

        dispatch({type:UPDATE_PRODUCT_SUCC,payload:data})


    }catch(error){
        dispatch({type:UPDATE_PRODUCT_FAIL,payload:error})
    }
}

// admin delete products review by provideing product id and review id
export let AdminDelProductReviewAction=({productId,id})=>async (dispatch)=>{


    try{
        dispatch({type:ADMIN_DEL_PRODUCT_REVIEW_REQ})
       
let {data} =await axios.delete(`http://localhost:1300/api/v1/products/review?id=${id}&productId=${productId}`,{withCredentials:true})

        dispatch({type:ADMIN_DEL_PRODUCT_REVIEW_SUCC,payload:data})


    }catch(error){
        dispatch({type:ADMIN_DEL_PRODUCT_REVIEW_FAIL,payload:error})
    }
}