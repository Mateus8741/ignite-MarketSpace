import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'

import { App } from './src/App'
import { theme } from './src/styles/theme'

export default function Index() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <App />
    </NativeBaseProvider>
  )
}
