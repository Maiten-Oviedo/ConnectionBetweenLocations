import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { ResponseType } from '../../types'
import FormItem from '../FormItem'

const LocationsForm = () => {
  const [inputLocation, setInputLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [prevLocations, setPrevLocations] = useState<ResponseType[]>([])

  const handleLocationSearch = async (textLocation: string) => {
    if (!textLocation.trim()) return

    try {
      setPrevLocations([])
      setIsLoading(true)
      setError(null)

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${textLocation}&format=json&limit=3`,
        {
          headers: {
            'User-Agent': 'MyReactNativeApp (tucorreo@ejemplo.com)',
          },
        }
      )

      if (!res.ok) {
        throw new Error(`Request Error. Error: ${res.status}`)
      }

      const data: ResponseType[] = await res.json()
      setPrevLocations(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  // 👇 Debounce con useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputLocation.trim() !== '') {
        handleLocationSearch(inputLocation)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [inputLocation])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Ingresa la ubicación"
        onChangeText={setInputLocation}
        value={inputLocation}
      />
      {isLoading && <ActivityIndicator />}
      <ScrollView style={{ maxHeight: 180 }}>
        {prevLocations.map((item, index) => (
          <FormItem key={index} item={item} />
        ))}
      </ScrollView>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
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
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
})

export default LocationsForm
