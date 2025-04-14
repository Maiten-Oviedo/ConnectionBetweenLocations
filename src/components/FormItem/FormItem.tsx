import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ResponseType } from '../../types'
import { useDispatch } from 'react-redux'
import { setLocation } from '../../store/locationSlice'

const FormItem = ({ item }: { item: ResponseType }) => {
  const dispatch = useDispatch()

  const { display_name, lat, lon } = item

  const handleSetLocation = () => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lon)
    dispatch(setLocation({ latitude, longitude }))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSetLocation}
        style={styles.buttonContainer}
      >
        <Text style={styles.text}>{display_name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 300,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
})

export default FormItem
