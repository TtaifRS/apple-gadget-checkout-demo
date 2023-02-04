import { createSlice } from '@reduxjs/toolkit'
import appleMac from '../assets/apple-mac.png'
import ipHone from '../assets/iphone.png'
import nikonDslr from '../assets/nikon-dslr.png'


const initialState = {
  deliveryAddress: {},
  cartItems: [
    {
      id: 1,
      name: 'MacBook Pro',
      quantity: 1,
      price: '250',
      image: appleMac

    },
    {
      id: 2,
      name: 'iPhone 13',
      quantity: 1,
      price: '100',
      image: ipHone
    },
    {
      id: 3,
      name: 'Nikon Coolpix',
      quantity: 1,
      price: '50',
      image: nikonDslr
    },
  ],

  discount: {
    hasCoupon: false,
    couponType: '',
    amount: 0
  },
  subTotal: 0,
  total: 0

};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity + 1;

    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      cartItem.quantity = cartItem.quantity - 1;
    },
    setDiscount: (state, { payload }) => {
      state.discount = {
        ...payload
      }
    },
    setDeliveryAddress: (state, { payload }) => {
      state.deliveryAddress = {
        ...payload
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let subTotal = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.quantity;
        subTotal += item.quantity * item.price;
      });
      if (state.discount.hasCoupon) {
        if (state.discount.couponType === 'percentage') {
          total = ((subTotal - ((subTotal * state.discount.amount) / 100))) + 100
        }
        if (state.discount.couponType === 'number') {
          total = ((subTotal - state.discount.amount)) + 100
        }
      } else {
        total = subTotal + 100
      }
      state.subTotal = subTotal
      state.amount = amount;
      state.total = total;
    },
  },

});
export const { increase, decrease, setDiscount, calculateTotals, setDeliveryAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
