import React from 'react'
import { stripe as stripePromise } from '../../lib/stripe'
import { apiBase } from '../../lib/api'

export default () => {
  const onClick = async () => {
    const response = await fetch(`${apiBase()}/checkout/start`, {
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
  return (
    <button role="link" onClick={onClick}>
      Checkout
    </button>
  )
}
