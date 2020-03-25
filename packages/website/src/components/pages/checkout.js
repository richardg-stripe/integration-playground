import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import { stripe } from '../../lib/stripe'
import { apiBase } from '../../lib/api'
import { getOrSetUserId } from '../../lib/userId'
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

const Error = styled.p`
  color: red;
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
      <Button type="submit">Pay</Button>
    </CardFormContainer>
  )
}

export default props => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      console.log('mounted')
      const paymentIntent = await fetch(`${apiBase()}/payment/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: getOrSetUserId() })
      })
      const response = await paymentIntent.json()
      console.log('response', response)
      setPaymentIntentClientSecret(response.clientSecret)
    })()
  }, [])
  return (
    <div>
      <Elements stripe={stripe}>
        <PayForm
          paymentIntentClientSecret={paymentIntentClientSecret}
          onSuccess={() => history.push('/paymentSucceeded')}
          onError={error => setError(JSON.stringify(error))}
        />
      </Elements>
      <Error>{error}</Error>
    </div>
  )
}
