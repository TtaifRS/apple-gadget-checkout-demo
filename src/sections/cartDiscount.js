import { useEffect, useState } from 'react'
import { Button, FormHelperText, Stack, TextField, } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import CouponCode from './couponCode'
import { setDiscount, calculateTotals } from '../store/cartStore';
import MainCard from '@/components/mainCard';



const validationSchema = yup.object({
  code: yup.string().oneOf(['Discount5', 'Discount10', 'Special300'], 'Coupon expired').required('Coupon code is required')
})

function CartDiscount() {
  const dispatch = useDispatch()
  const [coupon, setCoupon] = useState("")





  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: coupon
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.code === "Discount5") {
        const discount = {
          hasCoupon: true,
          couponType: 'percentage',
          amount: 5
        }

        dispatch(setDiscount(discount))
      }
      if (values.code === "Discount10") {
        const discount = {
          hasCoupon: true,
          couponType: 'percentage',
          amount: 10
        }

        dispatch(setDiscount(discount))
      }
      if (values.code === "Special300") {
        const discount = {
          hasCoupon: true,
          couponType: 'number',
          amount: 300
        }


        dispatch(setDiscount(discount))
      }
      dispatch(calculateTotals())
    }

  })


  return (
    <>

      <CouponCode setCoupon={setCoupon} />
      <MainCard>
        <Stack justifyContent="flex-end" spacing={1} sx={{
          padding: '5px'
        }}>
          <form
            onSubmit={formik.handleSubmit}>
            <Stack justifyContent="flex-end" spacing={1}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <TextField
                  id='code'
                  name='code'
                  fullWidth
                  placeholder='Add coupon here'
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.code)}
                />
                <Button type='submit' color='primary' variant='contained' >
                  Apply
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
        {formik.errors.code && (
          <FormHelperText error id="standard-code">
            {formik.errors.code}
          </FormHelperText>
        )}
      </MainCard>
    </>
  )
}

export default CartDiscount


