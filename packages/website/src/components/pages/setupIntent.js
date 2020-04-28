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
    .query({ errorRedirect: '/setupIntent' })
    .toString()

const confirmSetupIntent = async (paymentIntentClientSecret, paymentMethod) => {
  const stripe = await stripePromise
  if (paymentMethod.type === 'card') {
    return stripe.confirmCardSetup(paymentIntentClientSecret, {
      payment_method: paymentMethod
    })
  } else if (paymentMethod.type === 'sepa_debit') {
    return stripe.confirmSepaDebitSetup(paymentIntentClientSecret, {
      payment_method: paymentMethod,
      return_url: paymentReturnUrl()
    })
  }
}

export default props => {
  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      const setupIntentResponse = await fetch(`${apiBase()}/setupIntent/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: getOrSetUserId() })
      })
      const setupIntent = await setupIntentResponse.json()
      console.log('setupIntent', setupIntent)
      setClientSecret(setupIntent.client_secret)
      const existingErrorMessage = _.get(setupIntent, 'last_payment_error.message')
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
          onSubmit={async paymentMethod => {
            const { error } = await confirmSetupIntent(clientSecret, paymentMethod)
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
