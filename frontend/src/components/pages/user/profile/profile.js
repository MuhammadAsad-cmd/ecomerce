import React from 'react'
import {  useSelector } from 'react-redux'
import './profilePg.css'

import { Link } from 'react-router-dom'
export  function ProfilePg() {
    
    let joiningDate;
    let {user}=useSelector((e)=>e.loadUserReducer)
    if(user){
        joiningDate=new Date(user.joiningDate).toDateString();
    }
    // let updateProfile=()=>{
    //     window.location.href='/user/me'
    // }
//    useEffect(()=>{
//     dispatch(loadUser())
//    },[dispatch])

        
    return(
        <>
        <div className='ProfilePgContainer'>
            <div className='profileSec1'>
                <p>My Profile</p>
                <img src={user?.avatar[0].url} alt="" />
                <Link to='/user/me'><button>Edit Profile</button></Link>
            </div>
            <div className='profileSec2'>
                <div>
                    <h4>Full Name</h4>
                    <p>{user?.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <h4>Joined At</h4>
                    <p>{joiningDate}</p>
                </div>
                <div className='profileSec2Btn'><Link to="/user/orders"><button>My Orders</button></Link></div>
                <div className='profileSec2Btn'><Link to="/user/changePassword"><button> Change Password</button></Link></div>

            </div>
        </div>
        
      
        </>
    )
}
