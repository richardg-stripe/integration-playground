import React, { useState } from 'react'
import { IbanElement, useStripe, useElements } from '@stripe/react-stripe-js'
import URI from 'urijs'
import PaymentForm from './paymentForm'

export default props => {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  return (
    <PaymentForm
      onSubmit={async e => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'sepa_debit',
          sepa_debit: elements.getElement(IbanElement),
          billing_details: {
            name: name,
            email: email
          }
        })

        if (error) {
          console.log('[error]', error)
          props.onError(error)
        } else {
          console.log('[PaymentMethod]', paymentMethod)

          // You can simulatenously create the payment method here if you like.
          const { error, paymentIntent } = await stripe.confirmSepaDebitPayment(props.paymentIntentClientSecret, {
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
      <input onChange={event => setName(event.target.value)} placeholder="Name" />
      <input onChange={event => setEmail(event.target.value)} placeholder="email" />
      <IbanElement options={{ supportedCountries: ['SEPA'] }} />
    </PaymentForm>
  )
}
