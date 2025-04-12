import React, {
  // LegacyRef,
  // MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
// import MapViewDirections from 'react-native-maps-directions'
// import Constants from 'expo-constants'
import { RootState } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from '../../store/locationSlice'
import { useUserLocation } from '../../hooks/useUserLocation'

export default function Map() {
  const mapRef = useRef<MapView>(null)
  const dispatch = useDispatch()
  const reduxLocation = useSelector((state: RootState) => state.location)

  const [toUserLocation, setToUserLocation] = useState<number>(0)

  const {
    userLocation: origin,
    loading: isLoadingLocation,
    setUserLocation: setOrigin,
  } = useUserLocation()

  const handleNewLocation = (latitude: number, longitude: number) => {
    dispatch(setLocation({ latitude, longitude }))
  }

  // Animar mapa cuando cambia origen o reduxLocation
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(origin, 1000)
    }
  }, [origin, toUserLocation])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(reduxLocation, 1000)
    }
  }, [reduxLocation])

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapView} initialRegion={origin}>
        <Marker
          draggable
          onDragEnd={({ nativeEvent }) =>
            setOrigin({
              ...nativeEvent.coordinate,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            })
          }
          coordinate={origin}
        />
        <Marker
          draggable
          onDragEnd={({ nativeEvent }) =>
            handleNewLocation(
              nativeEvent.coordinate.latitude,
              nativeEvent.coordinate.longitude
            )
          }
          coordinate={reduxLocation}
        />
        <Polyline
          coordinates={[origin, reduxLocation]}
          strokeColor="#777"
          strokeWidth={3}
        />
      </MapView>
      {!isLoadingLocation && (
        <View style={styles.userPositionContainer}>
          <TouchableOpacity
            onPress={() => setToUserLocation(toUserLocation + 1)}
          >
            <Text style={styles.userPositionContainerText}>Tu Ubicación</Text>
          </TouchableOpacity>
        </View>
      )}

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
  userPositionContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    zIndex: 1,
  },
  userPositionContainerText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
})
