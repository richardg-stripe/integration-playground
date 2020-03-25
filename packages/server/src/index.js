import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import stripe from './stripe'
import { handleWebhook } from './webhooks'
import { getCurrentPaymentIntentForUser, createPaymentIntent } from './database'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const createPaymentIntentAndSave = async userId => {
  const paymentIntent = await stripe.paymentIntents.create({ amount: 2000, currency: 'gbp', payment_method_types: ['card'] })
  console.log(paymentIntent)
  return createPaymentIntent(userId, paymentIntent)
}

app.post('/payment/start', async (request, response) => {
  console.log(request.body)
  const userId = request.body.userId
  console.log('userId', userId)
  const paymentIntent = getCurrentPaymentIntentForUser(userId) || (await createPaymentIntentAndSave(userId))
  response.json(paymentIntent)
})

app.post('/hooks', handleWebhook)
app.use('/', express.static('website'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
