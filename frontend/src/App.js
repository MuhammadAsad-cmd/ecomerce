
import './App.css';
import Footer from './components/layout/footer/footer';
import Header from './components/layout/header/header';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/pages/home/home';
import ProductDetailPage from './components/pages/productPage/productDetailPage';
import { ProductsPage } from './components/pages/productPage/productsPage';
import Search from './components/searchComponent/search';
import LoginAndSignup from './components/pages/user/loginAndSingnup/loginAndSignup';
import { UserOption } from './components/layout/header/userOption';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './components/redux/actions/userAction';
import {PrivateComponent,IsAdmin} from './privateComponent';
import {ProfilePg} from './components/pages/user/profile/profile';
import UpdateProfile from './components/pages/user/updateProfile/UpdateProfile';
import { ChangePassword } from './components/pages/user/changePassword/ChangePassword';
import { ForgetPassword } from './components/pages/user/forgetAndResetPassword/ForgetPassword';
import { ResetPassword } from './components/pages/user/forgetAndResetPassword/resetPassword';
import CartPage from './components/pages/cartPage/Cartpage';
import ShippingDetail from './components/pages/orderpage/ShippingDetailPage';
import OrderConfirmPage from './components/pages/orderpage/OrderConfirmPage';
import { Elements} from '@stripe/react-stripe-js';
import OrderPayment from './components/pages/orderpage/OrderPayment';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import OrderSuccessfullPage from './components/pages/orderpage/OrderSuccessful';
import OrderListPage from './components/pages/orderpage/OrderListPage';
import OrderDetailPage from './components/pages/orderpage/orderDetailPage';
import Dashboard from './components/admin/dashboard/dashboard';
import AdminOrderpage from './components/admin/adminOrders/AdminOrders';
import AdminProductspage from './components/admin/Adminproducts/AdminProducts';
import AdminCreateProduct from './components/admin/Adminproducts/AdminCreateProduct';
import AdminUpdateProduct from './components/admin/Adminproducts/AdminUpdateProduct';
import AdminUpdateOrder from './components/admin/adminOrders/AdminUpdateOrder';
import AdminReviews from './components/admin/adminReview/AdminReviews';
import SingleProductReviews from './components/admin/adminReview/singleProductReviews';
import AdminUpdateUser from './components/admin/adminUsers/userUpdate';
import AdminUserList from './components/admin/adminUsers/AdminUserList';
import PageNotFound from './components/pages/404page/404page';
import ContactUsPg from './components/pages/contactuspg/ContactUsPg';
import AboutUsPg from './components/pages/aboutUs/AboutUsPg';
function App() {
  let dispatch=useDispatch();
  let [stripeApiKey,SetStripeApiKey]=useState(null);
  //from backend
  let getSecretKey=async()=>{
    try {
      const {data} =await axios.get('http://localhost:1300/api/v1/payment/stripekey',{withCredentials:true,"Content-type":'application/json',});
    let mystripe= await loadStripe(data.stripeApiKey)
SetStripeApiKey(mystripe);
      
    } catch (error) {
      return false;
    }

// console.log(data);
  }


  
const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};
// console.log(stripePromise);
  let {user}=useSelector((e)=>e.loadUserReducer)

  useEffect(()=>{

getSecretKey()
dispatch(loadUser());



  },[dispatch])
 
  return (
   <>

   <Router>
   <Header/>
  {user && <UserOption/>}


 {/* {console.log(user)} */}
   <Routes>

<Route path='/' element={<PrivateComponent/>}>
    <Route exect path='/' element={<Home/>}/>
    <Route exect path='/product/:id' element={<ProductDetailPage/>}/>
    <Route exect path='/products' element={<ProductsPage/>}/>
    <Route exect  path='/products/:name' element={<ProductsPage/>}/>
    <Route exect path='/products/search' element={<Search/>}/>
    <Route exect path='/account' element={<ProfilePg/>}/>
    <Route exect path='/user/me' element={<UpdateProfile/>}/>
    <Route exect path='/user/changePassword' element={<ChangePassword/>}/>
    <Route exect path='/user/cart' element={<CartPage/>}/>
    <Route exect path='/user/orders' element={<OrderListPage/>}/>
    <Route exect path='/user/orders/address' element={<ShippingDetail/>}/>
    <Route exect path='/user/orders/confirm' element={<OrderConfirmPage/>}/>
    <Route exect path='/user/order/success' element={<OrderSuccessfullPage/>}/>
    <Route exect path='/user/order/:id' element={<OrderDetailPage/>}/>
    <Route exect path='/contact' element={<ContactUsPg/>}/>
    <Route exect path='/about' element={<AboutUsPg/>}/>
    {/* admin panel is below */}
    <Route exect path='/admin' Component={IsAdmin} >
    <Route exect path='/admin/dashboard' element={<Dashboard/>}/>
    <Route exect path='/admin/orders' element={<AdminOrderpage/>}/>
    <Route exect path='/admin/order/update/:id' element={<AdminUpdateOrder/>}/>
    <Route exect path='/admin/products' element={<AdminProductspage/>}/>
    <Route exect path='/admin/product/new' element={<AdminCreateProduct/>}/>
    <Route exect path='/admin/product/update/:id' element={<AdminUpdateProduct/>}/>
    <Route exect path='/admin/users' element={<AdminUserList/>}/>
    <Route exect path='/admin/reviews' element={<AdminReviews/>}/>
    <Route exect path='/admin/user/update/:id' element={<AdminUpdateUser/>}/>
    <Route exect path='/admin/product/review/:id' element={<SingleProductReviews/>}/>
    
    </Route>
    {stripeApiKey && <Route exect path='/user/orders/payment' element={

      <Elements stripe={stripeApiKey} options={options}>
<OrderPayment/>
      </Elements>
    }/>}
   </Route> 

   
 
      
   

   
    <Route exect path='/login' element={<LoginAndSignup/>}/>
    <Route exect path='/signUp' element={<LoginAndSignup/>}/>
    <Route exect path='/password/forget' element={<ForgetPassword/>}/>
    <Route exect path='/password/reset/:token' element={<ResetPassword/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    


   </Routes>
   <Footer/>
   </Router>
   
   </>
   
  );
}

export default App;
