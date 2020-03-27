import Checkout from '../components/pages/checkout'
import PaymentSucceeded from '../components/pages/paymentSucceeded'
import PaymentRedirect from '../components/pages/paymentRedirect'

const routes = [
  {
    path: '/paymentSucceeded',
    component: PaymentSucceeded
  },
  {
    path: '/paymentRedirect',
    component: PaymentRedirect
  },
  {
    path: '/',
    component: Checkout
  }
]

export default routes
