import React from 'react'
import { IdealBankElement, useElements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm'

export default props => {
  const elements = useElements()

  return (
    <PaymentForm
      onSubmit={async e => {
        props.onSubmit({
          type: 'ideal',
          ideal: elements.getElement(IdealBankElement)
        })
      }}
    >
      <IdealBankElement />
    </PaymentForm>
  )
}
