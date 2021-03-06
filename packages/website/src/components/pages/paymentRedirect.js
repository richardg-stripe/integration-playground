import React, { useEffect } from 'react'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import { stripe } from '../../lib/stripe'

export default props => {
  console.log(props)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      const paymentIntent = await (await stripe).retrievePaymentIntent(props.queryParams.payment_intent_client_secret)
      const status = _.get(paymentIntent, 'paymentIntent.status')
      if (status === 'succeeded') {
        history.push('/paymentSucceeded')
      } else {
        history.push(props.queryParams.errorRedirect)
      }
    })()
  }, [])
  return <div>Checking Payment Intent...</div>
}
