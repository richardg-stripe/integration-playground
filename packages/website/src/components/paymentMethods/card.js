import React from 'react'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm'

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

export const CardForm = props => <CardElement options={CARD_OPTIONS} {...props} />

export default props => {
  const elements = useElements()

  return (
    <PaymentForm
      onSubmit={async e => {
        const cardElement = elements.getElement(CardElement)
        props.onSubmit({
          type: 'card',
          card: cardElement
        })
      }}
    >
      <CardForm />
    </PaymentForm>
  )
}
