import { updatePaymentIntent } from './database'
import stripe from './stripe'

const handlePaymentIntentSucceeded = paymentIntent => {
  return updatePaymentIntent(paymentIntent.id, { succeeded: true })
}

export const handleWebhook = (request, response) => {
  let event
  const stripeSignature = request.headers['stripe-signature']
  try {
    event = stripe.webhooks.constructEvent(request.body, stripeSignature, process.env.WEBHOOK_SECRET)
  } catch (error) {
    console.error(error)
    response.status(400).send(`Webhook Error: ${error.message}`)
    return
  }
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
