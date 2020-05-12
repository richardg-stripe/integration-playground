import stripe from '../../stripe'
;(async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'eur',
      confirm: true,
      payment_method_data: {
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: '12',
          exp_year: '24',
          cvc: '123',
        },
      },
      payment_method_types: ['card'],
      transfer_data: {
        destination: 'acct_1GgASLEezb7IClhm',
      },
    })
    console.log(paymentIntent)
  } catch (error) {
    console.error(error)
  }
})()
