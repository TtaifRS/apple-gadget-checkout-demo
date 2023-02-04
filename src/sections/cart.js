import Avatar from '@/components/avatar'
import MainCard from '@/components/mainCard'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Divider, Grid, Table, TableBody, TableContainer, Typography, Stack, TableRow, TableCell, Button } from '@mui/material'
import { sum } from 'lodash'
import currency from 'currency.js'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increase, decrease, calculateTotals } from '../store/cartStore';





const Increment = ({ itemId, quantity }) => {
  const [value, setValue] = useState(quantity);
  const dispatch = useDispatch()



  const incrementHandler = () => {
    setValue(value - 1);
    dispatch(decrease({ id: itemId }))

  };

  const decrementHandler = () => {
    setValue(value + 1);
    dispatch(increase({ id: itemId }))
  };



  return (
    <Stack direction="row">
      <Button
        key="three"
        variant="text"
        disabled={value <= 1}
        onClick={incrementHandler}
        sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <MinusOutlined style={{ fontSize: 'inherit' }} />
      </Button>
      <Typography key="two" sx={{ p: '9px 15px', border: `1px solid #c2c2c2` }}>
        {value}
      </Typography>
      <Button
        key="one"
        variant="text"
        onClick={decrementHandler}
        sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <PlusOutlined style={{ fontSize: 'inherit' }} />
      </Button>
    </Stack>
  );
};











function Cart() {
  const [totalQuantity, setTotalQuantity] = useState(3)
  const [rows, setRows] = useState([])
  const products = useSelector((state) => state.cart.cartItems)

  const dispatch = useDispatch()

  useEffect(() => {
    setRows(products)
    setTotalQuantity(sum(
      products.map((product) => product.quantity)
    ))

    dispatch(calculateTotals())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, rows])


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Stack spacing={2}>
          <MainCard content={false}>
            <Grid container>
              <Grid item xs={12} sx={{ py: 2.5, pl: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant='subtitle1'>
                    Cart
                  </Typography>
                  <Avatar color='secondary' size='xs'>
                    {totalQuantity}
                  </Avatar>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {
                        rows.map((row, index) => {

                          return (
                            <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                              <TableCell component="th" scope='row'>
                                <Grid container alignItems="center" spacing={2}>
                                  <Grid item>
                                    <Avatar
                                      size='lg'
                                      variant='rounded'
                                      color='secondary'
                                      type="combined"
                                      src={row.image.src}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Stack spacing={0}>
                                      <Typography
                                        variant='subtitle1'
                                        color="textPrimary"
                                      >
                                        {row.name}
                                      </Typography>

                                    </Stack>
                                  </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell align='right'>
                                <Stack alignItems="center">
                                  <Typography variant='subtitle1'>
                                    {
                                      currency(row.price * row.quantity).format({ symbol: '৳' })
                                    }
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="right">
                                <Increment quantity={row.quantity} itemId={row.id} />
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Cart