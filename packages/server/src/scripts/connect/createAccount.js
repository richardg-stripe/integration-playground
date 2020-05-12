import stripe from '../../stripe'
;(async () => {
  try {
    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'GB',
      email: 'randomVendor@example.com',
      requested_capabilities: ['card_payments', 'transfers'],
    })
    console.log(account)
  } catch (error) {
    console.error(error)
  }
})()
