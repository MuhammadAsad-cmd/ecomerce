import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminSideBar/sidebar'

import { FaFileAlt, FaSpellCheck } from 'react-icons/fa'
import { AiOutlineDollarCircle, AiOutlinePartition, AiOutlineStock } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux';
import './AdminCreateProduct.css'
import { productDetail, updateProductAction } from '../../redux/actions/productAction'
import Loader from '../../layout/loader/loader'
import MetaData from '../../metaData'
import { useAlert } from 'react-alert'
import { Navigate, useParams } from 'react-router-dom'
export default function AdminUpdateProduct() {

let alert=useAlert();
// below reducer in useSeletor hock will be use for both new product and update product
    let {loading,error,sms}=useSelector((e)=>e.AddNewProductReducer)
    let {product}=useSelector((e)=>e.productDetailReducer)
        

let dispatch=useDispatch()
let params=useParams()
    let [previewPic,setPreviewPic]=useState([]);
    let [images,setImages]=useState([]);


    // input products pic
    let picInputFn=(e)=>{

setPreviewPic([]);
setImages([]);
let files=Array.from(e.target.files);

// filter images from selected file
let filterdFiles= files.filter((e)=>{
 return e.type.startsWith('image/');
})
files=filterdFiles;

files.forEach((e,i)=>{
   if (i<3) {
    let reader=new FileReader()
reader.onload=()=>{
    if (reader.readyState===2) {
        setPreviewPic((old)=>[...old,reader.result]) 
        setImages((old)=>[...old,reader.result]) 
        // setImages([reader.result]) 
}
}
reader.readAsDataURL(e)
   }

})
    }

    // submit form function
    let SubmitHandler=(e)=>{
        e.preventDefault()
        let formData=new FormData(e.target);
        
    
        
        images.forEach((i)=>{
    //    create an array
    formData.append('images',i)

})

dispatch(updateProductAction(formData,params.id))
        // console.log(formData);



    }


    useEffect(()=>{
        if (error) {
            alert.error(error);
    }
        if (sms) {
             alert.success(sms);
             dispatch(productDetail(params.id))

        }
        
        // dispatch(AdminDelClearSms_error())
        
    },[dispatch,error,sms,alert,params.id])


    useEffect(()=>{
        dispatch(productDetail(params.id))
    },[params.id,dispatch])
  return (
    <>
    {sms && <Navigate to={"/admin/products"}/>}
     <MetaData title="update Product"/>
   { loading && <Loader/> }
   <div className="ad_create_product_pg">
        <div className='borderRight'>
        <Sidebar active='products'/>
        </div>
        <div className='adCreateProformSec'>
            <form action=""  encType="multipart/form-data" onSubmit={SubmitHandler}>
                <h2>Update Product</h2>
    

                <div>
                    <FaSpellCheck/>
                    <input type="text" defaultValue={product? product.name:''} name="name" id=""  required placeholder='Product Name'/>
                </div>
                <div>
                <AiOutlineDollarCircle/>
                    <input type="number" defaultValue={product? product.price:''} min={500} name="price" id=""  required placeholder='Price'/>
                </div>
                <div>
                <FaFileAlt/>
                <textarea name="description" defaultValue={product? product.description:''} minLength={10} id="" cols="30" rows="1" required placeholder='Product description' ></textarea>

                </div>
                <div>
                <AiOutlinePartition/>
                <select name="catagory" defaultValue={product? product.catagory: "mobile"} id="" required>
                    <option value="laptop">Laptop</option>
                    <option value="footwear">Footwear</option>
                    <option value="bottom">Bottom</option>
                    <option value="tops">Tops</option>
                    <option value="camera">Camera</option>
                    <option value="mobile" >Mobile</option>
                    <option value="watchs">Watchs</option>
                </select>
                </div>
                <div>
                <AiOutlineStock/>
                <input type="number" defaultValue={product?.stock} name="stock"  id="" required placeholder='Stock'/>

                </div>
                <div>
                    <input  type="file" id="" accept='image/*' multiple onInput={picInputFn}/>
                </div>
                
                {product?.image &&   <div className='previewPic'>
                {product?.image.map((e,i)=>{
                  return  <img src={e.url} alt="" key={i}/>
                })}
            
              </div>}
              {previewPic.length !==0 &&   <div className='previewPic'>
                {previewPic.map((e,i)=>{
                  return  <img src={e} alt="" key={i}/>
                })}
            
              </div>}
                <div style={{border:'none'}}>
              <button className='ad_create_btn'>Update</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
