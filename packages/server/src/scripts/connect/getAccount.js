import stripe from '../../stripe'
;(async () => {
  try {
    const account = await stripe.accounts.retrieve('acct_1GgASLEezb7IClhm')
    console.log(JSON.stringify(account, null, 2))
  } catch (error) {
    console.error(error)
  }
})()
