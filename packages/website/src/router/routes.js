import Checkout from '../components/pages/checkout'
import PaymentSucceeded from '../components/pages/paymentSucceeded'

const routes = [
  {
    path: '/paymentSucceeded',
    component: PaymentSucceeded
  },
  {
    path: '/',
    component: Checkout
  }
]

export default routes
