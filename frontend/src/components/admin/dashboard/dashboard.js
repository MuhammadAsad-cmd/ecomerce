import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminSideBar/sidebar'
import './dashboard.css'
import { Doughnut,Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllOrderAction } from '../../redux/actions/orderAction';
import { AdminAllUserAction } from '../../redux/actions/userAction';
import { AdminLoadAllProducts } from '../../redux/actions/productAction';

function Dashboard() {

    let dispatch=useDispatch()
    let {users}=useSelector((e)=>e.loadAllUserReducer);
    let {products}=useSelector((e)=>e.AdminProductsReducer);
    let {orders}=useSelector((e)=>e.adminAllOrderReducer);

let [totalEarning,setTotalEarning]=useState(0)
let [productInstock,setProductInstock]=useState(0)
let [productOutstock,setProductOutstock]=useState(0)


    Chart.register(CategoryScale);
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalEarning],
          },
        ],
      };
    // Doughnut
     const Doughnutdata = {
    labels: ['OutOfStock', 'Instock'],
    datasets: [
      {
        data: [productOutstock, productInstock],
        backgroundColor: ['red', 'green'],
        borderWidth: 1,
      },
    ],
  };
  
  useEffect(()=>{
    if (orders.length !==0) {
        let totalEarnd= orders.reduce((ac,e)=>ac+e.totalPrice,0)
        setTotalEarning(totalEarnd)
     }
     if (products && products.length !==0) {
        // instock produts
        let instock =products.reduce((ac,e)=>ac+(e.stock >0? 1:0),0)
        setProductInstock(instock);
        setProductOutstock(products.length-instock)
      
     }
  },[orders,products,users])


  useEffect(()=>{
    dispatch(AdminLoadAllProducts());
    dispatch(AdminAllUserAction());
    dispatch(adminAllOrderAction());



  },[dispatch])
  return (
    <div className='dashboardPg'>
        
        <div className='borderRight'>
            <Sidebar active='dashboard'/>
        </div>
<div className='dashboardMain'>
    
        <h2>Dashboard</h2>
    
    <div className='ds_price_sec'>
       <p>Totall Amount</p>
       <p>{totalEarning}</p>
    </div>
    <div className='ds_circle_sec'>
        <div>
            <p>Products</p>
            <p>{products? products.length:0}</p>
        </div>
        <div>
        <p>Orders</p>
            <p>{orders? orders.length:0}</p>
        </div>
        <div>
        <p>Users</p>
            <p>{users? users.length:0}</p>
        </div>
    </div>
    <div className='ds_Linechart'>

    <Line data={lineState} />
    </div>
    <div className='ds_Doughnut'>

    <Doughnut data={Doughnutdata} />
    </div>

</div>
    </div>
  )
}

export default Dashboard