import React, { useState } from 'react'
import { IbanElement, useElements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm'

export default props => {
  const elements = useElements()
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  return (
    <PaymentForm
      onSubmit={async e => {
        props.onSubmit({
          type: 'sepa_debit',
          sepa_debit: elements.getElement(IbanElement),
          billing_details: {
            name: name,
            email: email
          }
        })
      }}
    >
      <input onChange={event => setName(event.target.value)} placeholder="Name" />
      <input onChange={event => setEmail(event.target.value)} placeholder="email" />
      <IbanElement options={{ supportedCountries: ['SEPA'] }} />
    </PaymentForm>
  )
}
