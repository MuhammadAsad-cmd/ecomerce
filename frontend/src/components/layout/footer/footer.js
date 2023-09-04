import React from 'react'
import Appstore from '../../../asserts/Appstore.png'
import playstore from '../../../asserts/playstore.png'
import './footer.css'

let Footer = () => {
    return (
        <>
<footer>
    <div className='leftFooter'>
        <h4>Download Our AP4</h4>
        <p>Download our app for android and  IOS mobiles</p>
        <img src={playstore} alt="playstore" />
        <img src={Appstore} alt="Appstore" />
    </div>
    <div className='midFooter'>
        <h1>storeZ</h1>
        <p>High Quality is our priority</p>
        <p>Copy right 2023 &copy; Alishan</p>


    </div>
    <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">LinkdIn</a>
        <a href="/">Facebook</a>
    </div>
</footer>
        </>
    )

}

export default Footer