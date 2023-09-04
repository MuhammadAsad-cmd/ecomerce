import React from 'react'
import './product.css'
import {Link} from 'react-router-dom'
import StarRatingCmponent from 'react-rating-stars-component'

let Product = ({product}) => {
    let options={
        className:"rate2" ,
          edit:false,
          color:"#cbd2d7",
          count:5,
          size:25,
          isHalf:true,
          value:product.rating
    }
    return (
        <>
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.image[0].url} alt="product" />
            <div className='productDetail'> 
            <h4>{product.name.length>100? `${product.name.slice(0,100)}...`:product.name}</h4>
            <div className='ratingContainer'>
            <StarRatingCmponent {...options}/>
            <span>{product.numOfReview}</span>
            </div>
            <p className='pPrice'>Rs: {product.price}</p>
            </div>
         

            
        </Link>

        </>
    )
}
export default Product