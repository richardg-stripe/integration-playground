import _ from 'lodash'

const paymentIntents = []
const setupIntents = []

export const getCurrentPaymentIntentForUser = userId => {
  return _.find(paymentIntents, pi => !pi.succeeded && pi.userId === userId)
}

export const getCurrentSetupIntentForUser = userId => {
  return _.find(setupIntents, si => !si.succeeded && si.userId === userId)
}

export const getPaymentIntentById = id => {
  return _.find(paymentIntents, { id })
}

export const getSetupIntentById = id => {
  return _.find(setupIntents, { id })
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

export const createSetupIntent = (userId, setupIntent) => {
  const newSetupIntent = {
    userId,
    id: setupIntent.id,
    succeeded: false,
  }
  setupIntents.push(newSetupIntent)
  return newSetupIntent
}

export const updateSetupIntent = (id, updatedSetupIntent) => {
  const setupIntent = getSetupIntentById(id)
  Object.assign(setupIntent, updatedSetupIntent)
  console.log('updateResult:', setupIntents)
  return setupIntent
}
