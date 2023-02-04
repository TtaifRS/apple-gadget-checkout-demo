import { Button, Grid, InputLabel, Stack, TextField, InputAdornment, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup'
import { State } from 'country-state-city'
import { useDispatch } from 'react-redux';
import MainCard from '@/components/mainCard';
import { MailOutlined } from '@ant-design/icons';

import { setDeliveryAddress } from '@/store/cartStore';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



const stateData = State.getStatesOfCountry("BD").map(state => ({
  value: state.name,
  displayValue: state.name
}))



function DeliveryInformation() {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleClick = (error) => {
    console.log(error)


  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <MainCard title="Delivery Information">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              area: '',
              address: '',
              address2: '',
              note: ''
            }}
            validationSchema={yup.object().shape({
              firstName: yup.string().min(2, 'First name should be minimum 2 characters').required('First name is required'),
              lastName: yup.string().min(2, 'Last name should be minimum 2 characters').required('Last name is required'),
              email: yup.string().email('Enter a valid email').required('Email is required'),
              phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
              area: yup.string().required('Please select your area'),
              address: yup.string().min(4, 'Please enter your full address').required('Address is required')
            })}
            onSubmit={(values) => {
              dispatch(setDeliveryAddress(values))
              router.push('/order-details')
            }}

            enableReinitialize
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={0.5}>
                      <InputLabel>First Name*</InputLabel>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        placeholder='Enter your first name'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={0.5}>
                      <InputLabel>Last Name*</InputLabel>
                      <TextField
                        fullWidth
                        id="lastName"
                        name='lastName'
                        placeholder='Enter your last name'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={0.5}>
                      <InputLabel htmlFor="email">Email*</InputLabel>
                      <TextField
                        fullWidth
                        id="email"
                        name='email'
                        placeholder='Enter email address'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlined />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={0.5}>
                      <InputLabel htmlFor="tel">Phone number*</InputLabel>
                      <TextField
                        fullWidth
                        id="phoneNumber"
                        name='phoneNumber'
                        placeholder='Enter phone number'
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +88
                            </InputAdornment>
                          )
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={12} sx={{ mariginTop: "100px" }}>
                    <Stack spacing={0.5}>
                      <FormControl>
                        <InputLabel htmlFor="tel">Select Area*</InputLabel>
                        <Select
                          labelId="area"
                          id="area"
                          name='area'
                          label="Select your area"
                          value={values.area}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.area && Boolean(errors.area)}

                        >

                          {stateData.map((state, i) => (
                            <MenuItem key={i} value={state.value ? state.value : 'none'}>
                              {state.displayValue}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.area && Boolean(errors.area) && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.area}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <Stack spacing={0.5}>
                      <InputLabel >Address 1*</InputLabel>
                      <TextField
                        fullWidth
                        multiline
                        id="address"
                        name='address'
                        placeholder='Enter your full address'
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}

                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Stack spacing={0.5}>
                      <InputLabel >Address 2</InputLabel>
                      <TextField
                        fullWidth
                        multiline
                        id="address2"
                        name='address2'
                        placeholder='Enter your other address(optional)'
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Stack spacing={0.5}>
                      <InputLabel >Note</InputLabel>
                      <TextField
                        fullWidth
                        multiline
                        id="note"
                        name='note'
                        placeholder='Note(optional)'
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={6} justifyContent="flex-end" alignContent="flex-end" sx={{ display: 'flex' }}>
                    <Button type='submit' color='primary' variant='contained' onClick={() => handleClick(errors)} >
                      Proceed To Checkout
                    </Button>
                  </Grid>
                </Grid>

              </form>
            )}
          </Formik>
        </MainCard>
      </Grid>
    </Grid >
  )
}


export default DeliveryInformation