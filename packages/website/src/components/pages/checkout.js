import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Elements } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import URI from 'urijs'
import { stripe as stripePromise } from '../../lib/stripe'
import { apiBase } from '../../lib/api'
import { getOrSetUserId } from '../../lib/userId'
import AllPaymentMethods from '../paymentMethods/allPaymentMethods'

const Error = styled.p`
  color: red;
`
const paymentReturnUrl = () =>
  URI(URI(window.location.href).origin())
    .pathname('/paymentRedirect')
    .query({ errorRedirect: '/paymentIntent' })
    .toString()

const confirmPayment = async (paymentIntentClientSecret, paymentMethod) => {
  const stripe = await stripePromise
  if (paymentMethod.type === 'card') {
    return stripe.confirmCardPayment(paymentIntentClientSecret, {
      payment_method: paymentMethod
    })
  } else if (paymentMethod.type === 'ideal') {
    return stripe.confirmIdealPayment(paymentIntentClientSecret, {
      payment_method: paymentMethod,
      return_url: paymentReturnUrl()
    })
  } else if (paymentMethod.type === 'sepa_debit') {
    return stripe.confirmSepaDebitPayment(paymentIntentClientSecret, {
      payment_method: paymentMethod,
      return_url: paymentReturnUrl()
    })
  }
}

export default props => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      console.log('mounted')
      const paymentIntentResponse = await fetch(`${apiBase()}/payment/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: getOrSetUserId() })
      })
      const paymentIntent = await paymentIntentResponse.json()
      console.log('paymentIntent', paymentIntent)
      setPaymentIntentClientSecret(paymentIntent.client_secret)
      const existingErrorMessage = _.get(paymentIntent, 'last_payment_error.message')
      if (existingErrorMessage) {
        setError(existingErrorMessage)
      }
    })()
  }, [])
  return (
    <div>
      <a href="https://github.com/richardg-stripe/integration-playground">Github</a>
      <Elements stripe={stripePromise}>
        <AllPaymentMethods
          paymentIntentClientSecret={paymentIntentClientSecret}
          onSubmit={async paymentMethod => {
            const { error } = await confirmPayment(paymentIntentClientSecret, paymentMethod)
            if (error) {
              setError(JSON.stringify(error))
            } else {
              history.push('/paymentSucceeded')
            }
          }}
        />
      </Elements>
      <Error>{error}</Error>
    </div>
  )
}
