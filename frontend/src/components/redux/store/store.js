
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productReducer,productDetailReducer,productReviewReducer,AdminProductsReducer,AdminDelProductReducer,AddNewProductReducer,AdminDelProReviewReducer} from '../reducers/productReducer';
import { createOrderReducer,getAllMyOrdersReducer,getOrderDetailReducer,adminAllOrderReducer ,adminDeleteOrderReducer,AdminUpdateOrderReducer} from '../reducers/orderReducer';
import {userReducer,loadUserReducer,updatePasswordReducer,updateProfileReducer,forgetPasswordReducer,resetPasswordReducer,loadAllUserReducer,adminDeleteUserReducer,adminLoadUserReducer,adminUpdateUserReducer} from '../reducers/userReducer'
import { CartReducer } from '../reducers/cartReducer';
let initialState={}
let reducers=combineReducers({
    productReducer,
    AdminProductsReducer,
    productDetailReducer,
    productReviewReducer,
    userReducer,
    loadUserReducer,
    loadAllUserReducer,
    updateProfileReducer,
    updatePasswordReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    CartReducer,
    createOrderReducer,
    getAllMyOrdersReducer,
    getOrderDetailReducer,
    AdminDelProductReducer,
    adminAllOrderReducer,
    AddNewProductReducer,
    adminDeleteOrderReducer,
    AdminUpdateOrderReducer,
    adminDeleteUserReducer,
    adminLoadUserReducer,
    adminUpdateUserReducer,
    AdminDelProReviewReducer

    
  
})
let middleware=[thunk]
let store=createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store