import { View, LayoutChangeEvent } from 'react-native'

import { AppProvider } from './contexts'
import { Routes } from './routes'

type AppProps = {
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined
}

export function App({ onLayout }: AppProps) {
  return (
    <AppProvider>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <Routes />
      </View>
    </AppProvider>
  )
}
