import React from 'react'
import pic from '../../../asserts/my.jpg'
import './AboutUsPg.css'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MetaData from '../../metaData'
export default function AboutUsPg() {
  return (
    <>
     <MetaData title={'About us'}/>
    <div className='AboutUsPg'>
        <div className='AboutUsMain'>
            <h2 style={{zIndex:1}}>About Us</h2>

            <div className='aboutSections'>
            <div className="aboutsec1">
           
           <img src={pic} alt="myimg" />
           <h4>Ali Shan</h4>
           <summary>This is my first Ecommerce web application.
            I develope it with MERN technology. Its only purpose to get experience </summary>
            </div>
      <div className="aboutsec2">
        <h3 className='c_ord'>Social Links</h3>
        <Link to='https://github.com/Alishan786a'><FaGithub className='c_ord'/> github</Link>
        <Link to='https://web.facebook.com/profile.php?id=100076469913932&_rdc=1&_rdr'><FaFacebook className='c_ord'/> Facebook</Link>
        <Link to='https://www.linkedin.com/in/ali-shan-1798a4229/'><FaLinkedin className='c_ord'/> LinkedIn</Link>

      </div>
            </div>
       

</div>

        </div>
        
</>

  )
}
