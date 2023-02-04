import { Grid } from '@mui/material'
import Head from 'next/head'

import Cart from '@/sections/cart'
import CartDiscount from '@/sections/cartDiscount'
import DeliveryInformation from '@/sections/deliveryInformation'
import OrderSummary from '../sections/orderSummery'

function Home() {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <DeliveryInformation />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart />
          <CartDiscount />
          <OrderSummary />
        </Grid>
      </Grid>
    </>
  )
}

export default Home