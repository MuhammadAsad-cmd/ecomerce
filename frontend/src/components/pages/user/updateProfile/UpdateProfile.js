
import React, { useEffect, useRef, useState } from 'react'
import './updateProfile.css'
import userpic from '../../../../asserts/Profile.png'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import MetaData from '../../../metaData';
import Loader from '../../../layout/loader/loader'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { AdminDelClearSms_error } from '../../../redux/actions/productAction'
import { loadUser, updateProfileAction } from '../../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';



export default function UpdateProfile() {
    let alert = useAlert()
    let dispatch = useDispatch();
    let fileInput=useRef()
    let navigate=useNavigate()
let {user}=useSelector((e)=>e.loadUserReducer)
let {sms,error,loading}=useSelector((e)=>e.updateProfileReducer)
    let [previewAvator, setPreviewAvator] = useState(userpic)
    let [avatar, setAvatar] = useState('')
    let [updateFormInput, setUpdateFormInput] = useState({
        name: user.name,
        email: user.email
       
    })

    //use to update form state
    let updateFormField = (e) => {
        setUpdateFormInput({ ...updateFormInput, [e.target.name]: e.target.value });

    }

    //register a user
    let updateProfile = (e) => {
        e.preventDefault();
        let userData = Object.fromEntries(new FormData(e.target));
        if (fileInput.current.files.length !==0) {
            
        }
        userData.avatar=avatar
        // console.log(userData);
        dispatch(updateProfileAction(userData))

    }



    //use to dispaly pic in box after selected
    let showPicInBox = (e) => {
        let reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewAvator(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }



    useEffect(()=>{
        if (error) {
            alert.error(error);
          
        }
        if (sms) {

            alert.success(sms);
            dispatch(loadUser())
            navigate('/account')

        }
dispatch(AdminDelClearSms_error())
// dispatch(loadUser())

    },[error,sms,dispatch,user,alert,navigate])
    return (
        <>
            <MetaData title="update Profile" />
{loading && <Loader/>}
            <div className="upDateProfileContainer">



                <div className="signupSec">
                    <p className='profileSec_header'>Update Profile</p>
                    <form action="post" onSubmit={updateProfile}>


                        <div className='nameSec'>
                            <AiOutlineUser className='userIcon' />
                            <input type="text" name="name" value={updateFormInput.name} onInput={updateFormField} id="name" placeholder='Name' />
                        </div>
                        <div className='emailSec'>
                            <AiOutlineMail className='userIcon' />
                            <input type="email" name="email" value={updateFormInput.email} onInput={updateFormField} id="updateProfileEmail" placeholder='Email' />
                        </div>

                        <div className='fileSec'>
                            <img src={previewAvator} alt="icon" />
                            <input type="file" name="avatar" id="updateFileUpload" ref={fileInput} onInput={showPicInBox} />
                        </div>
                        <div className="signupBtn">
                            <button>Update</button>
                        </div>
                    </form>

                </div>
            </div>




        </>

    )
}