import PaymentIntent from '../components/pages/paymentIntent'
import SetupIntent from '../components/pages/setupIntent'
import CheckoutJS from '../components/pages/checkoutJS'
import PaymentSucceeded from '../components/pages/paymentSucceeded'
import PaymentError from '../components/pages/paymentError'
import PaymentRedirect from '../components/pages/paymentRedirect'
import Routes from '../components/pages/routes'

export const routes = [
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
    path: '/checkoutjs',
    component: CheckoutJS
  },
  {
    path: '/setupIntent',
    component: SetupIntent
  },
  {
    path: '/paymentIntent',
    component: PaymentIntent
  }
]

export default [
  ...routes,
  {
    path: '/',
    component: Routes
  }
]
