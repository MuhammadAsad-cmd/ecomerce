import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import './orderListPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderAction } from "../../redux/actions/orderAction";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import MetaData from "../../metaData";
import { useAlert } from "react-alert";
import Loader from "../../layout/loader/loader";
function MyOrders(){

let dispatch=useDispatch()
let alert=useAlert()
let {error,loading,orders}=useSelector((e)=>e.getAllMyOrdersReducer)
let {user}=useSelector((e)=>e.loadUserReducer)
 
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300,sortable:false, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 150, flex: 0.5,cellClassName:(e)=>e.row.status==="Delivered"? "orderSuccess":"orderProcessing" },
    { field: "OrderQty", headerName: "OrderQty", minWidth: 150, flex: 0.3,type:"number" },
    { field: "amount", headerName: "Amount", minWidth: 270, flex: 0.5, type:'number'},
    { field: "action", headerName: "Action", minWidth: 150,sortable:false, flex:0.3,renderCell:(e)=>{
        // console.log(e.id);
        return(
       <Link  to={`/user/order/${e.id}`} style={{color:"black",fontSize:'18px',paddingLeft:"15px"}}>  <FaExternalLinkAlt/> </Link>
        )
    }},
  ];
let rows=[];
orders && orders.forEach(e => {
    rows.push({id:e._id,status:e.orderStatus,OrderQty:e.orderItems.length,amount:e.totalPrice,isSelectable:false})
});


useEffect(()=>{
    if (error) {
        alert.error(error);
    }
dispatch(getOrderAction());


},[dispatch,error,alert])

  return (
  <>
 
 {loading? <Loader/>:   <div className="myOrdersPage">
    <MetaData title={user.name}/>

            
          <DataGrid
          className="orderListTable"
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
            rowsPerPageOptions={[ 10]}
          disableSelectionOnClick
         
            
            
          />
          <h4 style={{paddingLeft:'10px',color:"rgba(0, 0, 0, 0.527)"}} >{user.name.charAt(0).toUpperCase()}{user.name.slice(1)}'s Orders</h4>

        </div>}
        </>
    
  );
};

export default MyOrders;
