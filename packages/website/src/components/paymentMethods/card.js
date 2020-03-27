import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
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
  const stripe = useStripe()
  const elements = useElements()

  return (
    <PaymentForm
      onSubmit={async e => {
        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement
        })

        if (error) {
          console.log('[error]', error)
          props.onError(error)
        } else {
          console.log('[PaymentMethod]', paymentMethod)

          // You can simulatenously create the payment method here if you like.
          const { error, paymentIntent } = await stripe.confirmCardPayment(props.paymentIntentClientSecret, {
            payment_method: paymentMethod.id
          })
          if (error) {
            props.onError(error)
          } else {
            props.onSuccess(paymentIntent)
          }
        }
      }}
    >
      <CardForm />
    </PaymentForm>
  )
}
