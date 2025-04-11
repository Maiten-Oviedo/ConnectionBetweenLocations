import React, { useEffect, useState } from 'react'
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { LocationType } from '../../types'

const LocationsForm = () => {
  const [location, setLocation] = useState<LocationType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const [inputLocation, setInputLocation] = useState('')

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Aquí iría tu lógica para obtener la ubicación
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json&limit=1`,
          {
            headers: {
              'User-Agent': 'MyReactNativeApp (tucorreo@ejemplo.com)',
            },
          }
        )
        const data = await res.json()

        if (data.length > 0) {
          const result = data[0]
          setLocation({
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        } else {
          throw new Error('No se encontró la ubicación.')
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    getLocation()
  }, [reloadTrigger, inputLocation])

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Ingresa la ubicación"
        onChangeText={newText => setInputLocation(newText)}
        defaultValue={inputLocation}
      />
      {isLoading && <ActivityIndicator />}
      {location && (
        <Text>
          Lat: {location.latitude}, Lon: {location.longitude}
        </Text>
      )}
      {error && (
        <>
          <Text style={{ color: 'red' }}>{error.message}</Text>
          <Pressable
            onPress={() => setReloadTrigger(prev => prev + 1)}
            style={{
              backgroundColor: '#444',
              padding: 10,
              marginTop: 10,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: 'white' }}>Reintentar</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default LocationsForm
