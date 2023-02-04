import '@/styles/globals.css'
import { store } from '@/store'
import { Provider } from 'react-redux'

import ThemeCustomization from '@/themes'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <Component {...pageProps} />
      </ThemeCustomization>
    </Provider>
  )
}
