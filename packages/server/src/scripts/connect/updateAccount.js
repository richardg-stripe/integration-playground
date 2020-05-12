import moment from 'moment'
import stripe from '../../stripe'
;(async () => {
  try {
    const account = await stripe.accounts.update('acct_1GgASLEezb7IClhm', {
      tos_acceptance: {
        date: moment().unix(),
        ip: '1.1.1.1',
        user_agent: 'netscape navigator lol',
      },
    })
    console.log(account)
  } catch (error) {
    console.error(error)
  }
})()
