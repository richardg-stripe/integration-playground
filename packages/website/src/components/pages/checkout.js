import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Elements } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import { stripe } from '../../lib/stripe'
import { apiBase } from '../../lib/api'
import { getOrSetUserId } from '../../lib/userId'
import AllPaymentMethods from '../paymentMethods/allPaymentMethods'

const Error = styled.p`
  color: red;
`

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
      <Elements stripe={stripe}>
        <AllPaymentMethods
          paymentIntentClientSecret={paymentIntentClientSecret}
          onSuccess={() => history.push('/paymentSucceeded')}
          onError={error => setError(JSON.stringify(error))}
        />
      </Elements>
      <Error>{error}</Error>
    </div>
  )
}
