import React, { useEffect } from 'react'
import Sidebar from '../AdminSideBar/sidebar'
import { DataGrid } from '@material-ui/data-grid'; 
import './AdminOrder.css'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllOrderAction, adminDeleteOrderAction } from '../../redux/actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../../layout/loader/loader';
import { AdminDelClearSms_error } from '../../redux/actions/productAction';
import MetaData from '../../metaData';
 function AdminOrderpage(){
    let alert=useAlert()
    let dispatch=useDispatch()
    
let {orders}=useSelector((e)=>e.adminAllOrderReducer)
let {sms,loading,error}=useSelector((e)=>e.adminDeleteOrderReducer)
    const Ordercolumn = [
        { field: "id", headerName: "Order ID", minWidth: 300,sortable:false, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5,cellClassName:(e)=>e.row.status==="Delivered"? "orderSuccess":"orderProcessing" },
        { field: "OrderQty", headerName: "OrderQty", minWidth: 150, flex: 0.3,type:"number" },
        { field: "amount", headerName: "Amount", minWidth: 270, flex: 0.5, type:'number'}, {  field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,renderCell:(e)=>{
            // console.log(e.getRowParams(e.id));
   return (
    <>
    <div className='admin_action_icon'>

   
    <Link to={`/admin/order/update/${e.id}`}>
   <FaPencilAlt className='ad_editIcon'/>
    </Link>

   <span onClick={()=>dispatch(adminDeleteOrderAction(e.id))}>

   <FaTrash className='ed_deleteIcon'/>
   </span>
   

    
    </div>
    </>)
        }},
        // Add more columns as needed
      ];

let OrderRows=[]
orders && orders.forEach(e => {
    OrderRows.push({id:e._id,status:e.orderStatus,OrderQty:e.orderItems.length,amount:e.totalPrice,isSelectable:false})
});

useEffect(()=>{
    if (error) {
        alert.error(error);
        
    }
    if (sms) {
        alert.success(sms);   
    }
    dispatch(AdminDelClearSms_error())
    dispatch(adminAllOrderAction());

    
},[dispatch,error,sms,alert])

    return(
        <>
        {loading && <Loader/>}
        <MetaData title='Order'/>
      <div className="AdminOrderpage">
            <div className='borderRight pTop-50'>
            <Sidebar active='orders'/>
            </div>
        <div className="AdminOrderpageMain pTop-50">
        <h2 style={{textAlign:'center'}}>Order List</h2>
            <DataGrid
            columns={Ordercolumn}
            rows={OrderRows}
            pageSize={10}
            rowsPerPageOptions={[ 10]}
            autoHeight
          disableSelectionOnClick
            />
            </div>
        </div>
        
        
        </>
    )
}
export default AdminOrderpage