import React, {
  // LegacyRef,
  // MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
// import MapViewDirections from 'react-native-maps-directions'
// import Constants from 'expo-constants'
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { LocationType } from '../../types'

const initialOrigin = {
  latitude: -32.892888740706695,
  longitude: -68.82975249045694,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}
const initialDestination = {
  latitude: -32.89575602313899,
  longitude: -68.85347253881604,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

export default function Map() {
  //Hacemos referencia a nustro MapView
  const mapRef = useRef<MapView>(null)

  //Creamos los estados iniciales de origen y destino
  const [origin, setOrigin] = useState<LocationType>(initialOrigin)
  const [destination, setDestination] =
    useState<LocationType>(initialDestination)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  //Cuando el estado de origin cambie, es decir que accedimos a la ubicación actual del usuario
  //actualizamos la posicion del MapView
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(origin, 1000)
    }
  }, [origin])

  //Cargamos la ubicación del usuario al cargar el componente
  useEffect(() => {
    getLocationPermission()
  }, [])

  //Obtenemos la ubicación del usuario
  const getLocationPermission = async () => {
    setIsLoadingLocation(true)
    try {
      let { status } = await requestForegroundPermissionsAsync()

      //Si el permiso no fue permitido devolvemos un alert para notificarlo
      if (status !== 'granted') {
        alert('Permision denied')
        return
      }

      //Si el permiso fue permitido obtenemos la ubicación del usuario
      let location = await getCurrentPositionAsync({})
      //Actualizamos el estado de la ubicación del usuario
      const currentLocation = {
        ...location.coords,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
      setOrigin(currentLocation)
    } catch (error) {
      alert('We had an error trying to get your current location :(')
    } finally {
      setIsLoadingLocation(false)
    }
  }
  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapView} initialRegion={origin}>
        <Marker
          draggable
          //Metodo nativo para mover el marcador
          onDragEnd={direction =>
            setOrigin({
              ...direction.nativeEvent.coordinate,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            })
          }
          coordinate={origin}
        />
        <Marker
          draggable
          onDragEnd={direction =>
            setDestination({
              ...direction.nativeEvent.coordinate,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            })
          }
          coordinate={destination}
        />
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={Constants.expoConfig.extra.googleMapsKey}
        /> */}
        <Polyline
          coordinates={[origin, destination]}
          strokeColor="#777"
          strokeWidth={3}
        />
      </MapView>
      {isLoadingLocation && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Cargando tu ubicación actual...
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
})
