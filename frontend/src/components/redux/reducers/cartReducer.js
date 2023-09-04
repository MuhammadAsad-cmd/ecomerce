
import {ADDTOCART,CLEARCART,REMOVETOCART,SAVESHIPPINGINFO} from '../constants/cartConst'
const initialState = {
    cart:localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')).sort():'',
    shippingInfo:localStorage.getItem('shippingDetail')? JSON.parse(localStorage.getItem('shippingDetail')):{address:'',pinCode:'',city:'',phNO:'',state:'',country:'0'}
}
export let CartReducer= (state = initialState, { type, payload }) => {
  switch (type) {

  case ADDTOCART:
    itemStoreInLocalStorage(payload)
    return { ...state, cart:localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):'' }

    case REMOVETOCART:
      removeItemFromCart(payload)
      return {...state,  cart:localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):'' }
      case SAVESHIPPINGINFO: 
        return {...state,  shippingInfo:payload}

        case CLEARCART:
          
        return {...state,  cart:[]}

  default:
    return state
  }
}




//it will help to check whatever cartitems array axcit in local storage or not
function itemStoreInLocalStorage(productObj) {
let isExcits=localStorage.getItem('cartItems');
if (isExcits) {
   let newArray= JSON.parse(isExcits).find(e => {
        if(e.productId===productObj.productId){
    // console.log(productObj);

           e.quentity+=productObj.quentity
           return e;
        }else{
          return false
        }

        
    });
    // console.log(newArray);
    if(newArray){
let indexOfProduct= JSON.parse(isExcits).findIndex((e)=>e.productId === productObj.productId);
       let arrayWithNewItem= JSON.parse(isExcits).filter((e)=>e.productId !== productObj.productId);
       arrayWithNewItem.splice(indexOfProduct,0,newArray);
// console.log(indexOfProduct);
        localStorage.setItem('cartItems',JSON.stringify(arrayWithNewItem))
        // console.log(JSON.parse(localStorage.getItem('cartItems')));

    }else{
      // console.log("ok");
       let arrayWithNewItem= JSON.parse(isExcits)
       arrayWithNewItem.push(productObj);

        localStorage.setItem('cartItems',JSON.stringify(arrayWithNewItem))

        
    }

} else {
    
    localStorage.setItem('cartItems',JSON.stringify([productObj]))
}
}


//this function is use to remove the item from local storage
function removeItemFromCart(Myid) {
  // console.log(Myid);
  let cart=JSON.parse(localStorage.getItem('cartItems'));
 let newCart= cart.filter((e)=>{
    return e.productId !== Myid
  });
  localStorage.setItem('cartItems',JSON.stringify(newCart))
}