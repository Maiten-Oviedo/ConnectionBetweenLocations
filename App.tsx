import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Modal from './src/components/Modal'
import Map from './src/components/MapView/Map'
import { Provider } from 'react-redux'
import store from './src/store'

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Map />
          <Modal />
          <StatusBar style="auto" />
        </View>
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
