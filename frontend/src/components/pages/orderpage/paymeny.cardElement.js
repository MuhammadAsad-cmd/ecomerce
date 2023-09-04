import React from 'react'
import {FaCreditCard,FaLock, FaCalendar} from 'react-icons/fa'
import {CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js'
import MetaData from '../../metaData'

export default function CardElement(){
        return(
          <>
           <MetaData title={'Payment'}/>
            <header><h3>Card Info</h3></header>
                <div>
                  <FaCreditCard />
                  <CardNumberElement name='cardNumber' className="paymentInput" />
                </div>
                <div>
                  <FaCalendar />
                  <CardExpiryElement name='cardExpiry' className="paymentInput" />
                </div>
                <div>
                  <FaLock />
                  <CardCvcElement name='cardCvc' className="paymentInput"/>
                </div>
                 </>
        )
      }

