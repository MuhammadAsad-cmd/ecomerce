import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import {  FaPhone, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './ContactUsPg.css'
import MetaData from '../../metaData'
export default function ContactUsPg() {
  return (
    <>
     <MetaData title={'Contact us'}/>
    <div className='ContactUsPg'>
        <div className='ContactUsMain'>
            <h2>Meet Us</h2>
            <div>
                <FaPhone/>
                <p>+923044164507</p>
            </div>
            <div>
                <AiOutlineMail/>
                <Link to='mailto:alishanwd1@gmail.com'>alishanwd1@gmail.com</Link>
                
            </div>
            <div>
                <FaWhatsapp/>
                <Link to='https://wa.me/+923044167507'>Meet me On Whatsapp</Link>
            </div>
        </div>

    </div>
    </>
  )
}
