import React, { useEffect } from 'react'
import Sidebar from '../AdminSideBar/sidebar'
import { DataGrid } from '@material-ui/data-grid'; 
import '../Adminproducts/AdminProducts.css'

import { useDispatch, useSelector } from 'react-redux';
import { AdminLoadAllProducts } from '../../redux/actions/productAction';
import { FaExpandAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';

 function AdminReviews(){

    let dispatch=useDispatch()

    let {products,loading}=useSelector((e)=>e.AdminProductsReducer)
    const UserCol = [
        { field: "id", headerName: "Product ID", minWidth: 230, flex: 0.7 },
        

        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "reviews",
          headerName: "Reviews",
          minWidth: 150,
          type:'number',
          flex: 0.5,
        },
    
        {
          field: "rating",
          headerName: "Avg Rating",
          minWidth: 150,
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


    <Link to={`/admin/product/review/${e.id}`}>
   <FaExpandAlt className='ad_editIcon'/>
    </Link>
   

    
    </div>
    </>)
        }},
        // Add more columns as needed
      ];
      let userRows=[];
      products && products.forEach(e => {
        userRows.push({id:e._id,name:e.name,rating:e.rating,reviews:e.numOfReview})
      });

// console.log(products);


useEffect(()=>{

  dispatch(AdminLoadAllProducts())

},[dispatch])

    return(
        <>
     
        {loading && <Loader/>}
        <MetaData title='Products Rating'/>
        <div className="AdminOrderpage">
            <div className='borderRight'>
            <Sidebar active='reviews'/>
            </div>
         <div className="AdminOrderpageMain pTop-50">
                <h2 style={{textAlign:'center'}}>Products Reviews</h2>
            <DataGrid
            columns={UserCol}
            rows={userRows}
            pageSize={10}
            autoHeight
            rowsPerPageOptions={[ 10]}
          disableSelectionOnClick
            
            />
            </div>
        </div>
        
        
        </>
    )
}
export default AdminReviews

