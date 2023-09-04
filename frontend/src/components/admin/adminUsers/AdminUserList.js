import React, { useEffect } from 'react'

import { DataGrid } from '@material-ui/data-grid'; 
import '../Adminproducts/AdminProducts.css'

import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import './AdminUserList.css'
import { AdminDelClearSms_error } from '../../redux/actions/productAction';
import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';
import Sidebar from '../AdminSideBar/sidebar';
import { AdminAllUserAction, adminDeleteUserAction } from '../../redux/actions/userAction';
 function AdminUserList(){

    let dispatch=useDispatch()
    let alert=useAlert()
    let {users}=useSelector((e)=>e.loadAllUserReducer)
    let {sms,error,loading}=useSelector((e)=>e.adminDeleteUserReducer)
    const UserCol = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.7 },
        {
            field: "email",
            headerName: "Email",
         
            minWidth: 200,
            flex: 0.5,
          },

        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
        
    
        {
          field: "role",
          headerName: "Role",
          cellClassName:((e)=>e.row.role==='admin'? 'adminCls':"userCls"),
          minWidth: 120,
          flex: 0.3,
          
        },
        {  field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
       type:'number',
        sortable: false,renderCell:(e)=>{
   return (
    <>
    <div className='admin_action_icon'>

   
    <Link to={`/admin/user/update/${e.id}`}>
   <FaPencilAlt className='ad_editIcon'/>
    </Link>

   <span onClick={()=>dispatch(adminDeleteUserAction(e.id))}>

   <FaTrash className='ed_deleteIcon'/>
   </span>
   

    
    </div>
    </>)
        }},
        // Add more columns as needed
      ];
      let userRows=[];
      users && users.forEach(e => {
        userRows.push({id:e._id,name:e.name,email:e.email,role:e.role})
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
   dispatch(AdminAllUserAction())

},[dispatch,sms,error,alert])

    return(
        <>
        {loading && <Loader/>}
        <MetaData title='User List'/>
        <div className="AdminOrderpage">
            <div className='borderRight'>
            <Sidebar active='users'/>
            </div>
         <div className="AdminOrderpageMain pTop-50">
                <h2 style={{textAlign:'center'}}>User List</h2>
            <DataGrid
            columns={UserCol}
            rows={userRows}
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
export default AdminUserList
