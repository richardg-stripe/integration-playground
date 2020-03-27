import _ from 'lodash'
import { updatePaymentIntent } from './database'

const handlePaymentIntentSucceeded = paymentIntent => {
  return updatePaymentIntent(paymentIntent.id, { succeeded: true })
}

export const handleWebhook = (request, response) => {
  const event = request.body
  console.log('/hooks', event)
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentIntentSucceeded(event.data.object)
      break
    default:
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true })
}
