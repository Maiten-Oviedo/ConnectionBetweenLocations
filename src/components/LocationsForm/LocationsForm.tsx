import React, { useEffect, useState } from 'react'
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ResponseType } from '../../types'
import { useDispatch } from 'react-redux'
import { setLocation } from '../../store/locationSlice'

const LocationsForm = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [inputLocation, setInputLocation] = useState('')

  const handleLocationSearch = async (textLocation: String) => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${textLocation}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'MyReactNativeApp (tucorreo@ejemplo.com)',
          },
        }
      )
      //Aplicamos el nagative programming
      if (!res.ok) {
        throw new Error(`Request Error. Error: ${res.status}`)
      }

      const arrayData = await res.json()
      const data: ResponseType = arrayData[0]

      if (data && data.lat && data.lon) {
        const latitude = parseFloat(data.lat)
        const longitude = parseFloat(data.lon)
        if (isNaN(latitude) || isNaN(longitude)) {
          throw new Error('Invalid coordinates received from API.')
        }
        dispatch(setLocation({ latitude, longitude }))
      } else {
        throw new Error('Not found the location.')
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Ingresa la ubicación"
        onChangeText={newText => setInputLocation(newText)}
        defaultValue={inputLocation}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLocationSearch(inputLocation)}
      >
        <Text style={styles.text}>Buscar</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator />}
      {error && (
        <>
          <Text style={styles.errorText}>{error.message}</Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textinput: {
    width: 200,
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
})

export default LocationsForm
