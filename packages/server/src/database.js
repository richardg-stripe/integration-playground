import _ from 'lodash'

const paymentIntents = []

export const getCurrentPaymentIntentForUser = userId => {
  return _.find(paymentIntents, pi => !pi.succeeded && pi.userId === userId)
}

export const getPaymentIntentById = id => {
  return _.find(paymentIntents, { id })
}

export const createPaymentIntent = (userId, paymentIntent) => {
  const newPaymentIntent = {
    userId,
    id: paymentIntent.id,
    succeeded: false,
  }
  paymentIntents.push(newPaymentIntent)
  return newPaymentIntent
}

export const updatePaymentIntent = (id, updatedPaymentIntent) => {
  const paymentIntent = getPaymentIntentById(id)
  Object.assign(paymentIntent, updatedPaymentIntent)
  console.log('updateResult:', paymentIntents)
  return paymentIntent
}
