import React, { useEffect } from 'react'
import Sidebar from '../AdminSideBar/sidebar'
import { DataGrid } from '@material-ui/data-grid'; 
import '../Adminproducts/AdminProducts.css'

import { useDispatch, useSelector } from 'react-redux';
import { AdminDelClearSms_error, AdminDelProductReviewAction, productDetail } from '../../redux/actions/productAction';
import { FaTrash } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';
import { useAlert } from 'react-alert';

 function SingleProductReviews(){

    let dispatch=useDispatch()
    let mypath=useParams()
    let alert=useAlert()

    let {product}=useSelector((e)=>e.productDetailReducer);
    let {sms,loading,error}=useSelector((e)=>e.AdminDelProReviewReducer);
    console.log(product);
    const UserCol = [
        { field: "id", headerName: "Review ID", minWidth: 230, flex: 0.7 },
        

        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
      
          flex: 0.1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          minWidth: 120,
          type:'number',
          flex: 0.8,
        },
        {  field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 120,
       type:'number',
        sortable: false,renderCell:(e)=>{
   return (
    <>
    <div className='admin_action_icon'>


    <span onClick={()=>dispatch(AdminDelProductReviewAction({productId:mypath.id,id:e.id}))}>

<FaTrash className='ed_deleteIcon'/>
</span>
   

    
    </div>
    </>)
        }},
        // Add more columns as needed
      ];
      let userRows=[];
      product?.reviews && product.reviews.forEach(e => {
        userRows.push({id:e._id,name:e.name,rating:e.rating,comment:e.comment})
      });

// console.log(products);


useEffect(()=>{
    if(error){
        alert.error(error)
           }
           if (sms) {
            alert.success(sms)
           }
           dispatch(AdminDelClearSms_error())
  dispatch(productDetail(mypath.id))

},[dispatch,sms,error,alert,mypath.id])

    return(
        <>
           {sms && <Navigate to={'/admin/reviews'}/>}
        {loading && <Loader/>}
        <MetaData title='Products Rating'/>
        <div className="AdminOrderpage">
            <div className='borderRight'>
            <Sidebar active='reviews'/>
            </div>
         <div className="AdminOrderpageMain pTop-50">
                <h2 style={{textAlign:'center'}}>Product reviews</h2>
            <DataGrid
            columns={UserCol}
            rows={userRows}
            pageSize={10}
            autoHeight
          disableSelectionOnClick
            
            />
            </div>
        </div>
        
        
        </>
    )
}
export default SingleProductReviews

