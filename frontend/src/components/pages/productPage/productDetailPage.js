import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from '../../layout/loader/loader'
import { AdminDelClearSms_error, productDetail, submitProductReview } from "../../redux/actions/productAction";
import Carousel from 'react-material-ui-carousel'
import StarRatingCmponent from 'react-rating-stars-component'
import './productDetail.css'
import { ReviewCard } from "../../reviewCard/ReviewCard";
import MetaData from "../../metaData";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import { useAlert } from "react-alert";
import { Button, DialogTitle, DialogContent, Dialog} from '@material-ui/core';
let ProductDetailPage=()=>{
let alert=useAlert()
let dispatch= useDispatch();
let myPath=useParams()
let {product,loading}=useSelector((d)=>d.productDetailReducer);
let {sms,error}=useSelector((d)=>d.productReviewReducer);
let [itemQuentity,setItemQuentity]=useState(1)
let [dialogBox,showhideDialogBox]=useState(false);
let [dialogBoxRating,setDialogBoxRating]=useState(0);

const [comment, setComment] = useState('');

let options={
        className:"detailPageRate" ,
        edit:false,
        isHalf:true,
        color:"#cbd2d7",
        count:5,
        size:30
   }
    // for second starrating component
   
let options2={
        className:"detailPageRate" ,
        edit:true,
        isHalf:true,
        color:"#cbd2d7",
        count:5,
        size:30,
        onChange:(newRating)=>setDialogBoxRating(newRating)
   }
  
    // submit review function
let submitReviewFn=()=>{
      if (comment.length<10) {
       return alert.error('Message should not be less then 10 character')
      }
     dispatch(submitProductReview({comment, rating:dialogBoxRating,productId:product._id}))
     showhideDialogBox(false)
    }


//use to increase the quentity
let increase=()=>{
    if (itemQuentity<product.stock) 
 setItemQuentity(++itemQuentity);
 else 
 alert.error(`There are only ${itemQuentity} products in stock`)

}
//use to decrease the quentity
let decrease=()=>{
    if (itemQuentity!==1)setItemQuentity(--itemQuentity)
    else alert.error('quentity should not be less then 1')
}
//addtocart
let addToCartFn=()=>{
    dispatch(addToCart(itemQuentity,product._id))
    alert.success('added to cart')
}

useEffect(()=>{
if (error) dispatch(alert.error(error)); 
if (sms) alert.success(sms);

dispatch(AdminDelClearSms_error())
dispatch(productDetail(myPath.id));
},[error,dispatch,sms,alert,myPath.id])

return (
<>
{loading && <Loader/>}

{ product && <div className="produtcDetail">
    <MetaData title={product.name}/>
    <div className="imgSec">
<div>
<Carousel>
  {product?.image?.map((e,i)=>{
    return(

        <img key={i} src={e.url} alt=""  />
    )
})}

</Carousel>

</div>

    </div>
    <div className="detailSec">
        <div className="nameSec">
        <h2>{product.name}</h2>
        <p>Produtc# {product._id}</p>
        </div>
        
        <div className="reviewContainer">

        <StarRatingCmponent {...options}   value={product.rating} />
        <span>({product.numOfReview} reviews)</span>
        </div>
        <div className="addToCartContainer">

        
        <div className="priceContainer">Rs:{" "}
        <b>{product.price}</b>

        </div>
       <div className="innerAddToCartContainer">
       
        <div className="quentityChangerContainer">
            <button onClick={decrease}>-</button>
            <input type="number" value={itemQuentity} readOnly/>
            <button onClick={increase}>+</button>
        </div>
       
        
        <button className={`addToCartBtn ${(product.stock<1)? "disabledBtn":''}`}  disabled={product.stock<1} onClick={addToCartFn}>Add To Cart</button>
 
        </div>
        </div>
        <div className="inStock">
            Status:{" "} <b className={(product.stock <1)? "redColor":"greenColor"}>
                {(product.stock <1)? "Out Of Stock":"In Stock"}
            </b>
        </div>
        <div className="description">
           Description:{" "}<p>{product.description}</p>
        </div>
        <button className="submitReview" onClick={()=>showhideDialogBox(true)}>Submit Review</button>
        
    </div>


</div>

}
{/* popup to take user review */}

<div>
   
      
    

      
      <Dialog open={dialogBox}>
        
        <DialogTitle id="dialog-title" style={{paddingBottom:0}}>Give your review</DialogTitle>
        <DialogContent>
            
        <StarRatingCmponent {...options2}    />
        <textarea
        rows={4}
        cols={25}
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        placeholder="Type your message here..."
        style={{resize:'none',fontSize:"18px",marginTop:"10px"}}
      />
       <div className=" dialog-box-btn">
        <Button variant="text" size="small" className="cancelBtn" onClick={()=>showhideDialogBox(false)}>Cancel</Button>
        <Button variant="text" size="small" className="submitBtn" onClick={submitReviewFn}>Submit</Button>
        </div>
        </DialogContent>
       
       
      </Dialog>
    </div>





{product && <div className="reviewsContainer">
    <h3>Reviews</h3>
    <div className="reviewsSec">
     
        {
       (product.reviews?.length !==0)?  product.reviews?.map((r)=>{
                return <div key={r._id} >
                <ReviewCard review={r}/>
                </div>
    }):  <h1 style={{textAlign: "center",width: "100%"}}>not reviews yet</h1>
        }
    </div>
</div>
}
</>
)
}
export default ProductDetailPage