import React from 'react'
import { stripe as stripePromise } from '../../lib/stripe'
import { apiBase } from '../../lib/api'

const openCheckout = async mode => {
  const response = await fetch(`${apiBase()}/checkout/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const sessionId = (await response.json()).id
  const stripe = await stripePromise
  await stripe.redirectToCheckout({
    sessionId
  })
}

export default () => {
  return (
    <div>
      <button onClick={() => openCheckout('payment')}>Payment</button>
      <button onClick={() => openCheckout('setup')}>Setup</button>
      <button onClick={() => openCheckout('subscription')}>Subscription</button>
    </div>
  )
}
