import React from 'react'
import { IdealBankElement, useStripe, useElements } from '@stripe/react-stripe-js'
import URI from 'urijs'
import PaymentForm from './paymentForm'

export default props => {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <PaymentForm
      onSubmit={async e => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'ideal',
          ideal: elements.getElement(IdealBankElement)
        })

        if (error) {
          console.log('[error]', error)
          props.onError(error)
        } else {
          console.log('[PaymentMethod]', paymentMethod)

          // You can simulatenously create the payment method here if you like.
          const { error, paymentIntent } = await stripe.confirmIdealPayment(props.paymentIntentClientSecret, {
            payment_method: paymentMethod.id,
            return_url: URI(URI(window.location.href).origin())
              .pathname('/paymentRedirect')
              .toString()
          })
          if (error) {
            props.onError(error)
          } else {
            props.onSuccess(paymentIntent)
          }
        }
      }}
    >
      <IdealBankElement />
    </PaymentForm>
  )
}
