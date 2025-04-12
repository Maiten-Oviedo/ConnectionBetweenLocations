import { useEffect, useState } from 'react'
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { LocationType } from '../types'
import { initialDestination } from '../constants/initialDestination'

export const useUserLocation = () => {
  const [userLocation, setUserLocation] =
    useState<LocationType>(initialDestination)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          alert('Permiso denegado')
          return
        }

        const loc = await getCurrentPositionAsync({})
        setUserLocation({
          ...loc.coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        })
      } catch (error) {
        alert('Error al obtener tu ubicación')
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  return { userLocation, loading, setUserLocation }
}
