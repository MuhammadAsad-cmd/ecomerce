import React from 'react'
import {Stepper,Step,StepLabel} from '@material-ui/core'
import { FaShippingFast,FaAddressCard} from 'react-icons/fa'
import {AiFillBank} from 'react-icons/ai'
import { Link } from 'react-router-dom'

function OrderStepper({currentStep}) {
    let steps=[
        {label:'Address',icon:<FaShippingFast className='stepper_icon'/>, link:'/user/orders/address'},
        {label:'Confirm Order',icon:<FaAddressCard className='stepper_icon'/>,link:'/user/orders/confirm'},
        {label:'Payment',icon:<AiFillBank className='stepper_icon'/>, link:'/user/orders/payment'},
    ]

  return (
    <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((e,index)=>{
          return  <Step key={index} active={currentStep===index? true:false} completed={currentStep>=index? true:false}>
                    <StepLabel icon={e.icon}><Link to={`${e.link}`} style={{textDecoration:"none",color:'black'}}>{e.label}</Link> </StepLabel>
                </Step>
        })}
                
              
            </Stepper>
  )
}

export default OrderStepper