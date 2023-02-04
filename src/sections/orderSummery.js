import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import currency from 'currency.js';
import { useSelector, useDispatch } from 'react-redux'

import MainCard from '@/components/mainCard';


function OrderSummary() {

  const subTotal = useSelector((state) => state.cart.subTotal)
  const total = useSelector((state) => state.cart.total)
  const discount = useSelector((state) => state.cart.discount)



  return (
    <Stack spacing={3}>
      <MainCard content={false} sx={{ borderRadius: '4px', borderTop: '1px inherit' }}>
        <TableContainer>
          <Table sx={{ minWidth: 'auto' }} size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle1'>
                    Order Summery
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>
                  Sub Total
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {currency(subTotal).format({ symbol: '৳' })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>Discount</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
                    {
                      discount.hasCoupon ? (
                        discount.couponType === 'percentage' ? `${discount.amount} %` : currency(discount.amount).format({ symbol: '৳' })
                      ) : "0"
                    }
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>
                  Delivery Charge
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {currency(100).format({ symbol: '৳' })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>
                  Total
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {currency(total).format({ symbol: '৳' })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </MainCard>
    </Stack>
  )
}

export default OrderSummary