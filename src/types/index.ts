import store from '../store'

export type LocationType = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export type ResponseType = {
  lat: string
  lon: string
  display_name: string
}

// Tipos útiles para usar nuestro redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
