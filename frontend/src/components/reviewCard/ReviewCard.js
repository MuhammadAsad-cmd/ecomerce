import React from 'react'
import './ReviewCard.css'
import StarRatingComponent from 'react-rating-stars-component'
import img1 from '../../asserts/Profile.png'
export let ReviewCard=({review})=>{
    let options={
        className:"userRating" ,
        edit:false,
        isHalf:true,
        color:"#cbd2d7",
        count:5,
        size:25
      
    }
 return(
    <>
    <div className='reviewCard'>
        <div className='imgSec'><img src={img1} alt="" /></div>
        <h4>{review.name}</h4>
        <StarRatingComponent {...options} value={review.rating}/>
        <p>{review.comment}</p>
     
    </div>
    </>
 )
}
