import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import stripe from './stripe'
import { handleWebhook } from './webhooks'
import { getCurrentPaymentIntentForUser, createPaymentIntent } from './database'

const app = express()
app.use(cors())

app.post('/api/hooks', bodyParser.raw({ type: 'application/json' }), handleWebhook)

app.use(bodyParser.json())

const createPaymentIntentAndSave = async userId => {
  const paymentIntent = await stripe.paymentIntents.create({ amount: 2000, currency: 'eur', payment_method_types: ['card', 'ideal', 'sepa_debit'] })
  console.log(paymentIntent)
  return createPaymentIntent(userId, paymentIntent)
}

app.use('/', express.static('website'))

app.get('/*', (req, res) => res.sendFile(path.join(path.resolve(), '/website/index.html')))

app.post('/api/payment/start', async (request, response) => {
  console.log(request.body)
  const userId = request.body.userId
  console.log('userId', userId)
  const paymentIntentDbRecord = getCurrentPaymentIntentForUser(userId) || (await createPaymentIntentAndSave(userId))
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentDbRecord.id)
  response.json(paymentIntent)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
