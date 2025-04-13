import React, { useMemo, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import LocationsForm from '../LocationsForm/LocationsForm'

const Modal = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['8%', '20%'], [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={{ borderRadius: 20 }}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.text}>Selecciona tu destino 🔽 </Text>
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
    marginBottom: 10,
  },
})

export default Modal
