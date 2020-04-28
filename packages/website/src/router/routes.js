import Checkout from '../components/pages/checkout'
import CheckoutJS from '../components/pages/checkoutJS'
import PaymentSucceeded from '../components/pages/paymentSucceeded'
import PaymentError from '../components/pages/paymentError'
import PaymentRedirect from '../components/pages/paymentRedirect'

const routes = [
  {
    path: '/paymentSucceeded',
    component: PaymentSucceeded
  },
  {
    path: '/paymentError',
    component: PaymentError
  },
  {
    path: '/paymentRedirect',
    component: PaymentRedirect
  },
  {
    path: '/checkout',
    component: CheckoutJS
  },
  {
    path: '/setupIntents',
    component: Checkout
  },
  {
    path: '/',
    component: Checkout
  }
]

export default routes
