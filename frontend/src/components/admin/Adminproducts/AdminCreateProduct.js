import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminSideBar/sidebar'

import { FaFileAlt, FaSpellCheck } from 'react-icons/fa'
import { AiOutlineDollarCircle, AiOutlinePartition, AiOutlineStock } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux';
import './AdminCreateProduct.css'
import { AddNewProductAction, clearErrors } from '../../redux/actions/productAction'
import Loader from '../../layout/loader/loader'
import MetaData from '../../metaData'
import { useAlert } from 'react-alert'
import { Navigate } from 'react-router-dom'
export default function AdminCreateProduct() {

let alert=useAlert();
    let {loading,error,sms}=useSelector((e)=>e.AddNewProductReducer)
let dispatch=useDispatch()
    let [previewPic,setPreviewPic]=useState([]);
    let [images,setImages]=useState([]);
    // input products pic
    let picInputFn=(e)=>{

setPreviewPic([]);
setImages([]);
let files=Array.from(e.target.files)
// filter images from selected file
let filterdFiles= files.filter((e)=>{
    return e.type.startsWith('image/');
   })
   files=filterdFiles
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

dispatch(AddNewProductAction(formData))
        // console.log(formData);



    }
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
            
        }
        if (sms) {
            alert.success(sms)
            
        }
    },[error,sms,dispatch,alert])

  return (
    <>
     {sms && <Navigate to={"/admin/products"}/>}
     <MetaData title="new Product"/>
   { loading && <Loader/> }
   <div className="ad_create_product_pg">
        <div className='borderRight'>
        <Sidebar active='create'/>
        </div>
        <div className='adCreateProformSec'>
            <form action=""  encType="multipart/form-data" onSubmit={SubmitHandler}>
                <h2>Create Product</h2>
    

                <div>
                    <FaSpellCheck/>
                    <input type="text" defaultValue={''} name="name" id=""  required placeholder='Product Name'/>
                </div>
                <div>
                <AiOutlineDollarCircle/>
                    <input type="number" defaultValue={''} min={500} name="price" id=""  required placeholder='Price'/>
                </div>
                <div>
                <FaFileAlt/>
                <textarea name="description" defaultValue={''} minLength={10} id="" cols="30" rows="1" required placeholder='Product description' ></textarea>

                </div>
                <div>
                <AiOutlinePartition/>
                <select name="catagory" defaultValue="mobile" id="" required>
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
                <input type="number" defaultValue={''} name="stock" min={1} id="" required placeholder='Stock'/>

                </div>
                <div>
                    <input  type="file" id="" accept='image/*' multiple   required onInput={picInputFn}/>
                </div>
              {previewPic.length !==0 &&   <div className='previewPic'>
                {previewPic.map((e,i)=>{
                  return  <img src={e} alt="" key={i}/>
                })}
            
              </div>}
                <div style={{border:'none'}}>
              <button className='ad_create_btn'>Create</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
