import {React} from 'react'
import {  AiFillCheckCircle} from 'react-icons/ai';
import './orderSuccessfull.css'
import { Link } from 'react-router-dom';
import MetaData from '../../metaData';
 let OrderSuccessfullPage=()=>{
    return(
        <>
         <MetaData title={'SuccessFull'}/>
        <div className="order_succ_container">
        <AiFillCheckCircle className='checkIcon'/>
        <h3>Your order has been placed successfully</h3>
        <Link to={'/user/orders'}>View Order</Link>
        </div>
        </>
    )
}
export default OrderSuccessfullPage;