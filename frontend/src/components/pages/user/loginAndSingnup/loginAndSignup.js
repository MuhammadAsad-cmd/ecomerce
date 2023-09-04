import React, { useEffect, useRef, useState } from 'react'
import './LoginAndSignup.css'
import {login, registerUserAction} from '../../../redux/actions/userAction'
import userpic from '../../../../asserts/Profile.png'
import { AiOutlineMail, AiFillLock ,AiOutlineUser} from 'react-icons/ai'
import MetaData from '../../../metaData';
import Loader from '../../../layout/loader/loader'
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { AdminDelClearSms_error, clearErrors } from '../../../redux/actions/productAction'
import { loadUser } from '../../../redux/actions/userAction'

import { Link, useNavigate } from 'react-router-dom'


export default function LoginAndSignup() {
    let alert=useAlert()
let dispatch=useDispatch();
let navigate=useNavigate()


    let {error,sms,loading}=useSelector((e)=>e.userReducer);
    let {user,loading:loading2}=useSelector((e)=>e.loadUserReducer);
    let LoginAndSignupSec = useRef();
    let [previewAvator,setPreviewAvator]=useState(userpic)
    let [avatar, setAvatar] = useState('')
    let [formInpute,setFormInputs]=useState({
name:'alishan',
email:"alishanwd6@gmail.com",
password:'Alishan786&'
    })
    //urlpath mean on which page request comes on login page or signup
    let Urlpath = window.location.pathname.slice(1)
    let [activePage, setActive] = useState(Urlpath)

    //use to update form state
   let updateFormField=(e)=>{
    setFormInputs({...formInpute,[e.target.name]:e.target.value});
    }
    // console.log(window.location.pathname.slice(1));
    let activeFn = (e) => {
        let headerButton = document.querySelectorAll(".LoginAndSignupHeader>div");
        headerButton.forEach(el => {
            el.classList.remove('activeHeader')
        });

        e.target.classList.add('activeHeader');
        if (e.target.innerText !== 'Login') {
            LoginAndSignupSec.current.scrollTo(410, 0)
            setActive("signUp")
            // window.location.pathname='/signUp'
        } else {
            LoginAndSignupSec.current.scrollTo(-410, 0);
            // window.location.pathname='/login'
            setActive("login")
        }
    }
    //register a user
    let registerUser=(e)=>{
        e.preventDefault();
        let userData=Object.fromEntries(new FormData(e.target))
        userData.avatar=avatar
        // console.log(userData);
        dispatch(registerUserAction(userData))
    }

  
    //login user
    let loginUser=(e)=>{
        e.preventDefault();
        let userData=Object.fromEntries(new FormData(e.target))
        // console.log(userData);

        dispatch(login(userData))
    }
    //use to dispaly pic in box after selected
    let showPicInBox=(e)=>{
        let file=e.target.files[0]
        if ( !file.type.startsWith('image/')) {
            return alert.error('please select valid image')
        }
            
          
        let reader=new FileReader()
        reader.onload=()=>{
            if (reader.readyState===2) {
                setPreviewAvator(reader.result) 
                setAvatar(reader.result) 
 }
  }
 reader.readAsDataURL(e.target.files[0])

    }
 
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (sms) {
            alert.success(sms);
            
            dispatch(AdminDelClearSms_error())
            dispatch(loadUser());
           
        }
   
     

    },[error,sms,dispatch,alert])
    useEffect(()=>{
        if (user) {
            navigate('/products');
           
        }
    },[user,navigate])
    return (
<>

  {loading2===false? <div className="LoginAndSignupPage">
     
        {/* {isAuthentic && <Navigate to={'/products'}/>} */}
        {/* {statusCode ==200 && <Navigate to={'/products'}/>} */}
        
            {activePage === "login" ?
                <MetaData title="Login" /> :
                <MetaData title="SignUp" />}
{console.log(loading)}
        {loading? <Loader/> : <div className="LoginAndSignupContainer">
                <div className='LoginAndSignupHeader'>
                    <div onClick={activeFn} className={(activePage === "login") ? 'activeHeader' : ''}>Login</div>
                    <div onClick={activeFn} className={(activePage !== "login") ? 'activeHeader' : ''}>SignUp</div>
                </div>
                <div className="LoginAndSignupSec" ref={LoginAndSignupSec}>
                    <div className="loginSec" >
                        <form action="" onSubmit={loginUser}>
                        <div className='emailSec'>
                            <AiOutlineMail className='userIcon' />
                            <input type="email" name="email" value={formInpute.email} onInput={updateFormField} id="loginEmail" placeholder='Email' required />
                        </div>
                        <div className='passwordSec'>
                            <AiFillLock className='lockIcon' />
                            <input type="password" name="password" value={formInpute.password} onInput={updateFormField} id="loginPassword" placeholder='Password' />
                        </div>
                        <div className="forgetSec">
                            <Link to="/password/forget">forget password?</Link>
                        </div>
                        <div className="LoginBtn">
                            <button>Login</button>
                        </div>
                        </form>
                    </div>
                    {/* signup form*/}
    
                   
                    <div className="signupSec" >
                        <form action="post"  onSubmit={registerUser}>

                       
                    <div className='nameSec'>
                            <AiOutlineUser className='userIcon' />
                            <input type="text" name="name" value={formInpute.name} onInput={updateFormField} id="name" placeholder='Name'  required/>
                        </div>
                        <div className='emailSec'>
                            <AiOutlineMail className='userIcon' />
                            <input type="email" name="email" value={formInpute.email} onInput={updateFormField} id="signupEmail" placeholder='Email' required />
                        </div>
                        <div className='passwordSec'>
                            <AiFillLock className='lockIcon' />
                            <input type="password" name="password" value={formInpute.password} onInput={updateFormField} id="signupPassword" placeholder='Password'  required/>
                        </div>
                        <div className='fileSec'>
                            <img src={previewAvator} alt="icon" />
                            <input type="file" accept='image/*' name="avatar" id="fileUpload" onInput={showPicInBox}/>
                        </div>
                        <div className="signupBtn">
                            <button>Signup</button>
                        </div>
                    </form>

                    </div>
                </div>


            </div>}
        </div>:<Loader/>}
        </>
       
    )
}