import stripe from '../../stripe'
;(async () => {
  try {
    const capabilities = await stripe.accounts.listCapabilities('acct_1GgASLEezb7IClhm')
    console.log(JSON.stringify(capabilities, null, 2))
  } catch (error) {
    console.error(error)
  }
})()
