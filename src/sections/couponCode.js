
import MainCard from '@/components/mainCard';
import AnimateButton from '@/components/animateButton';
import Transitions from '@/components/transitions';
import { useState } from 'react';
import { CardContent, Grid, Button, Alert } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';







function CouponCode({ setCoupon }) {

  const [animate, setAnimate] = useState(false)

  const setDiscount = (code) => {
    setAnimate(true)
    setCoupon(code)
    setTimeout(() => {
      setAnimate(false)
    }, 2500)
  }


  return (
    <MainCard title="Coupon for you">
      <Grid container spacing={3}>
        {
          animate && (
            <Grid item xs={12}>
              <Transitions type="zoom" in={animate} direction="down">
                <Alert variant='outlined' severity='success' sx={{ borderColor: 'success.dark', color: 'success.dark' }}>
                  coupon copied
                </Alert>
              </Transitions>
            </Grid>
          )
        }
        <Grid item xs={12} sm={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-around">
                <Grid item>
                  <AnimateButton>
                    <CopyToClipboard text="(Discount5" onCopy={() => setDiscount('Discount5')}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        sx={{
                          bgcolor: 'secondary.light',
                          color: 'secondary.dark',
                          border: '2px dashed',
                          '&:hover': { border: '2px dashed', bgcolor: 'secondary.light' }
                        }}
                      >Discount5</Button>

                    </CopyToClipboard>
                  </AnimateButton>
                </Grid>
                <Grid item>
                  <AnimateButton>
                    <CopyToClipboard text="Discount10" onCopy={() => setDiscount('Discount10')}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.dark',
                          border: '2px dashed',
                          '&:hover': { border: '2px dashed', bgcolor: 'primary.light' }
                        }}
                      >Discount10</Button>

                    </CopyToClipboard>
                  </AnimateButton>
                </Grid>
                <Grid item>
                  <AnimateButton>
                    <CopyToClipboard text="Special300" onCopy={() => setDiscount('Special300')}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        sx={{
                          bgcolor: 'orange.light',
                          color: 'error.main',
                          border: '2px dashed',
                          '&:hover': { border: '2px dashed', bgcolor: 'orange.light' }
                        }}
                      >Special300</Button>

                    </CopyToClipboard>
                  </AnimateButton>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>

    </MainCard>
  )
}

export default CouponCode