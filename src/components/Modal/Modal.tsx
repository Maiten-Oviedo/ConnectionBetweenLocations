import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import LocationsForm from '../LocationsForm/LocationsForm'

const Modal = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['8%', '20%'], []) // Solo 20% de altura

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={{ borderRadius: 20 }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.text}>Selecciona tu ubicación 🔽 </Text>
        <LocationsForm />
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
})

export default Modal
