import React from 'react'
import { CardElement as CardElementComponent } from '@stripe/react-stripe-js'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Comic Sans MS',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: '#87BBFD'
      }
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE'
    }
  }
}

export const CardForm = props => <CardElementComponent options={CARD_OPTIONS} {...props} />
