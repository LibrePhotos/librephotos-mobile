import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { NativeBaseProvider } from 'native-base'
import { store, persistor } from '@/Store/store'
import { ApplicationNavigator } from '@/Navigators'
import './Translations'
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>
        <ApplicationNavigator />
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
)

export default App
