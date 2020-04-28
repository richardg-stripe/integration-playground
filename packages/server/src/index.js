import _ from 'lodash'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import stripe from './stripe'
import { handleWebhook } from './webhooks'
import { getCurrentPaymentIntentForUser, createPaymentIntent, getCurrentSetupIntentForUser, createSetupIntent } from './database'

const app = express()
app.use(cors())

app.post('/api/hooks', bodyParser.raw({ type: 'application/json' }), handleWebhook)

app.use(bodyParser.json())

const createPaymentIntentAndSave = async userId => {
  const category = _.sample(['clothes', 'swag', 'merch'])
  const moreInfoLink = 'https://google.com/search?q=swag'
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'eur',
    payment_method_types: ['card', 'ideal', 'sepa_debit'],
    metadata: { category, moreInfoLink },
  })
  console.log(paymentIntent)
  return createPaymentIntent(userId, paymentIntent)
}

const createSetupIntentAndSave = async userId => {
  const category = _.sample(['clothes', 'swag', 'merch'])
  const moreInfoLink = 'https://google.com/search?q=swag'
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card', 'sepa_debit'],
    customer: 'cus_HBEd78F12WT1GJ',
    metadata: { category, moreInfoLink },
  })
  console.log(setupIntent)
  return createSetupIntent(userId, setupIntent)
}

app.use('/', express.static('website'))

app.get('/*', (req, res) => res.sendFile(path.join(path.resolve(), '/website/index.html')))

app.post('/api/paymentIntent/start', async (request, response) => {
  console.log(request.body)
  const userId = request.body.userId
  console.log('userId', userId)
  const paymentIntentDbRecord = getCurrentPaymentIntentForUser(userId) || (await createPaymentIntentAndSave(userId))
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentDbRecord.id)
  response.json(paymentIntent)
})

app.post('/api/setupIntent/start', async (request, response) => {
  console.log(request.body)
  const userId = request.body.userId
  console.log('userId', userId)
  const setupIntentDbRecord = getCurrentSetupIntentForUser(userId) || (await createSetupIntentAndSave(userId))
  const setupIntent = await stripe.setupIntents.retrieve(setupIntentDbRecord.id)
  response.json(setupIntent)
})

app.post('/api/checkout/payment', async (request, response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'ideal'],
    mode: 'payment',
    line_items: [
      {
        name: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        images: ['https://www.clothes2order.com/images/Russell_Classic_TShirt_White-1046-475.jpg'],
        amount: 500,
        currency: 'eur',
        quantity: 1,
      },
    ],
    submit_type: 'book',
    success_url: `${process.env.WEB_SITE_BASE}/paymentSucceeded?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEB_SITE_BASE}/paymentError`,
  })
  response.json(session)
})

app.post('/api/checkout/setup', async (request, response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'sepa_debit'],
    mode: 'setup',
    success_url: `${process.env.WEB_SITE_BASE}/paymentSucceeded?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEB_SITE_BASE}/paymentError`,
  })
  response.json(session)
})

app.post('/api/checkout/subscription', async (request, response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    success_url: `${process.env.WEB_SITE_BASE}/paymentSucceeded?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEB_SITE_BASE}/paymentError`,
    subscription_data: {},
  })
  response.json(session)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
