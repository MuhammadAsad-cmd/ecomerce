import React, { useEffect, useState } from 'react'
import './productsPage.css'
import { useDispatch, useSelector } from 'react-redux'
import {  getAllProducts } from '../../redux/actions/productAction'
import Product from '../../product/product'
import Pagination from 'react-js-pagination'
import Slider from '@reijovosu/react-range-slider'
import sliderStyle from './productsPage.css'
import Loader from '../../layout/loader/loader'
import MetaData from '../../metaData'
import {useAlert} from 'react-alert'
import { useParams } from 'react-router-dom'

export let ProductsPage = () => {

    let dispatch = useDispatch()
    let alert=useAlert()
    let myParams=useParams()
    let [activepage, setActivepage] = useState(1)
    let [priceSliderVal, setPriceSliderVal] = useState([2000,100000])
    let [ratingSliderVal, setRatingSliderMaxVal] = useState([0,5])
    let [catagory, setCatagory] = useState('')
    let catagoryList = [
        "Laptop", "Footwear", "Bottom", "Tops", "Camera", "Mobile", "watchs"
    ]
    let { products,limitProduct, productCount, loading,error } = useSelector((d) => d.productReducer);

   
    let sliderOptions = {
        min: 500,
        max: 100000,

        stylesObj: {
            minBall: {
                height: "20px",
                width: "20px",
                backgroundColor: 'rgb(228, 57, 27)',
            },
            line: {
                backgroundColor: "rgb(179, 180, 146)"
            },
            values: {
                color: 'rgb(228, 57, 27)'
            },
            maxBall: {
                height: "20px",
                width: "20px",
                backgroundColor: 'rgb(228, 57, 27)',
            },
            midline: {
                backgroundColor: 'rgb(228, 57, 27)'
            }
        },

        display: (v) => <b>{v}</b>,
        moduleStyles: sliderStyle,
    }
    //rating silder
    let ratingSliderOptions = {
        min: 0,
        max: 5,

        stylesObj: {
            minBall: {
                height: "20px",
                width: "20px",
                backgroundColor: 'rgb(228, 57, 27)',
            },
            line: {
                backgroundColor: "rgb(179, 180, 146)"
            },
            values: {
                color: 'rgb(228, 57, 27)'
            },
            maxBall: {
                height: "20px",
                width: "20px",
                backgroundColor: 'rgb(228, 57, 27)',
            },
            midline: {
                backgroundColor: 'rgb(228, 57, 27)'
            }
        },

        display: (v) => <b>{v}</b>,
        moduleStyles: sliderStyle,
    }
    let options = {
        pageRangeDisplayed: 5,
        prevPageText: "prev",
        firstPageText: "first",
        lastPageText: "last",
        nextPageText: "next",
        innerClass: "paginationUl",
        activeClass: "activePage",
        activeLinkClass: "activePageLink",
        itemClass: "listItems",
        itemClassPrev: "prevClass",
        itemClassFirst: "firstClass",
        itemClassLast: "lastClass",
        itemClassNext: "nextClass",
    }
   //this condition is use to check what user has logined or not
  

  useEffect(()=>{
    setActivepage(1);
  },[priceSliderVal, catagory,ratingSliderVal])

    useEffect(() => {
        if (error) {
            alert.error(error);
             
          }
       
        // dispatch(AdminDelClearSms_error());
        dispatch(getAllProducts({ nameOfProducts:myParams?.name, activepage, priceSliderVal, catagory,ratingSliderVal }));
         catagorySelectFn()
    }, [dispatch, activepage,priceSliderVal, catagory,ratingSliderVal,error,alert,myParams?.name]);

    return (
        <div className='productsPageContainer'>
         
            <MetaData title="Products"/>
            {loading && <Loader />}
            <h1>Products</h1>
            <div className='filterAndProductSec'>

                <div className='filterSec'>
                    <div className='sliderSec'>
                        <span ><b className='p10'>Price:</b> </span>
                        <Slider {...sliderOptions} onChange={(e)=>setPriceSliderVal([e.minValue,e.maxValue])} maxValue={priceSliderVal[1]} minValue={priceSliderVal[0]} />
                    </div>
                    <div className="catagorySec">
                        <span><b>Catagories:</b> </span>
                        <ul className='catagoryList'>
                            {catagoryList.map((e) => {
                                return <li onClick={() => setCatagory(e)} key={e}>{e}</li>
                            })}

                        </ul>
                    </div>
                    <div className='ratingSliderSec'>
                        <span ><b className='p10'>Rating:</b> </span>
                        <Slider {...ratingSliderOptions} onChange={(e)=>setRatingSliderMaxVal([e.minValue,e.maxValue])} maxValue={ratingSliderVal[1]} minValue={ratingSliderVal[0]} />
                    </div>

                </div>

                <div className="productContainer">
                    {products && (products.length > 0) ? products.map((p) => {
                        // console.log(productCount)
                        return <div key={p._id}>

                            <Product product={p} />


                        </div>

                    }) : <h2 style={{ textAlign: 'center' }}> Result not found</h2> }



                </div>
            </div>
            {/* && (products.length > productCount) */}
            {products && (products.length < productCount) && <div className='paginationContainer'>

                <Pagination {...options} totalItemsCount={productCount} itemsCountPerPage={limitProduct} onChange={(e)=>setActivepage(e)}
                    activePage={activepage} />
            </div>
            }
        </div>

    )
}

function catagorySelectFn() {

    let ul = document.querySelectorAll('.catagoryList li');

    ul.forEach((li) => {
        li.addEventListener('click', () => {
            ul.forEach((i) => {
                if (i.classList.contains('activeCatagory')) {

                    i.classList.remove('activeCatagory')
                }

            })
            li.classList.add('activeCatagory');


        })
    })

}