import React, {useState } from 'react'
import './search.css'
import MetaData from '../metaData';
import {  useNavigate } from 'react-router-dom';
export default function Search() {
    let [val,setVal]=useState('');
    let navigate=useNavigate()

let search=()=>{
  return navigate(`/products/${val}`)
// window.location.assign(`/products/${val}`);
}
let updateVal=(e)=>{
    setVal(e.target.value);
}

  return (
    <div className='searchContainer'>
<MetaData title="Search"/>
    <div className='searchBox'>
        <input type="search" name="" value={val} onChange={updateVal} placeholder='Search item' id="" />
        <button onClick={search}>Search</button>
    </div>
    </div>
  )
}
