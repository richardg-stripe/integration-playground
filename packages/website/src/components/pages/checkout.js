import React from 'react'
import styled from 'styled-components'
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { stripe } from '../../lib/stripe'
import { CardForm } from '../cardForm'
import Form from '../../core/form'
import Button from '../../core/button'

const CardFormContainer = styled(Form)`
  margin: 90px;
  padding: 20px;
  border-style: none;
  background-color: #7795f8;
  will-change: opacity, transform;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #819efc;
  flex-direction: column;
`

const PayForm = props => {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <CardFormContainer
      onSubmit={async e => {
        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement
        })

        if (error) {
          console.log('[error]', error)
        } else {
          console.log('[PaymentMethod]', paymentMethod)
        }
      }}
    >
      <CardForm />
      <Button type="submit">Pay</Button>
    </CardFormContainer>
  )
}

export default () => {
  return (
    <Elements stripe={stripe}>
      <PayForm />
    </Elements>
  )
}
