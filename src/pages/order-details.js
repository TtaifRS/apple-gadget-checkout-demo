import { useSelector } from 'react-redux'
import Head from 'next/head'
import _ from 'lodash'
import { useRouter } from 'next/router'
import MainCard from '@/components/mainCard'
import { Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'

function OrderDetails() {
  const router = useRouter()
  const deliveryInformation = useSelector((state) => state.cart.deliveryAddress)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const total = useSelector((state) => state.cart.total)

  const { firstName, lastName, email, PhoneNumber, area, address } = deliveryInformation


  useEffect(() => {
    if (_.isEmpty(deliveryInformation)) {
      router.push("/")
    }
  }, [deliveryInformation, router])

  return (
    <>
      <Head>
        <title>Order Details</title>
      </Head>
      <MainCard title="Order details">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item>
              <Typography variant='h5'>
                {firstName} {lastName}
              </Typography>
              <Typography variant='h6'>
                {email}
              </Typography>
              <Typography variant='h6'>
                {PhoneNumber}
              </Typography>
              <Typography variant='body2'>
                {area} {address}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {
              cartItems.map((item, i) => (
                <Grid key={i}>
                  <Grid>
                    <Typography variant='h6'>
                      {item.name} X {item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
            <Grid>
              <Divider />
            </Grid>
            <Grid>
              <Typography variant='subtitle1'>
                Total amount ৳{total}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  )
}


export default OrderDetails