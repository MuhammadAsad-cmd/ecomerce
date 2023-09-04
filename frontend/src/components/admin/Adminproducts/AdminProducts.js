import React, { useEffect } from 'react'
import Sidebar from '../AdminSideBar/sidebar'
import { DataGrid } from '@material-ui/data-grid'; 
import './AdminProducts.css'

import { useDispatch, useSelector } from 'react-redux';
import { AdminDelClearSms_error, AdminDelProductAction, AdminLoadAllProducts } from '../../redux/actions/productAction';
import { FaPencilAlt,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';
 function AdminProductspage(){

    let dispatch=useDispatch()
    let alert=useAlert()
    let {products}=useSelector((e)=>e.AdminProductsReducer)
    let {sms,error,loading}=useSelector((e)=>e.AdminDelProductReducer)
    const Ordercolumn = [
        { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },

        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
        {  field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,renderCell:(e)=>{
   return (
    <>
    <div className='admin_action_icon'>

   
    <Link to={`/admin/product/update/${e.id}`}>
   <FaPencilAlt className='ad_editIcon'/>
    </Link>

   <span onClick={()=>dispatch(AdminDelProductAction(e.id))}>

   <FaTrash className='ed_deleteIcon'/>
   </span>
   

    
    </div>
    </>)
        }},
        // Add more columns as needed
      ];
      let OrderRows=[];
      products && products.forEach(e => {
        OrderRows.push({id:e._id,name:e.name,stock:e.stock,price:e.price})
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
   dispatch(AdminLoadAllProducts())

},[dispatch,sms,error,alert])

    return(
        <>
        {loading && <Loader/>}
        <MetaData title='Products'/>
        <div className="AdminOrderpage">
            <div className='borderRight'>
            <Sidebar active='all'/>
            </div>
         <div className="AdminOrderpageMain pTop-50">
                <h2 style={{textAlign:'center'}}>Product List</h2>
            <DataGrid
            columns={Ordercolumn}
            rows={OrderRows}
            pageSize={10}
            autoHeight
          disableSelectionOnClick
          rowsPerPageOptions={[ 10]}
            
            />
            </div>
        </div>
        
        
        </>
    )
}
export default AdminProductspage