# React Native App con Mapa y Búsqueda de Ubicación usando Redux
<img src="https://github.com/user-attachments/assets/7a4e0b94-bcd2-49ea-bff8-794d3ae61747" alt="Mapa" width="300"/>

Esta aplicación permite al usuario buscar una ubicación (por ejemplo, "Maipú Mendoza") y mostrarla en un mapa utilizando [OpenStreetMap](https://www.openstreetmap.org/) con [Nominatim](https://nominatim.openstreetmap.org/). El estado de la ubicación se maneja globalmente con **Redux Toolkit**.

---

## 🚀 Características

- Búsqueda de ubicaciones con Nominatim API
- Mapa interactivo que muestra la ubicación buscada
- Estado global de latitud/longitud con Redux
- Bottom Sheet Modal para seleccionar ubicación
- React Native + Expo + React Native Maps + Redux Toolkit

---

## 📁 Estructura de Carpetas

```
/App.tsx
/src
  /components
    /MapView
      Map.tsx
    /Modal
      Modal.tsx
    /LocationsForm
      LocationsForm.tsx
  /store
    index.ts
    locationSlice.ts
/types.ts
```

---

## 📦 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalá las dependencias:

```bash
npm install
```

3. Instalá las dependencias necesarias para mapas y Redux:

```bash
npm install @reduxjs/toolkit react-redux react-native-maps
```

> Si usás Expo, también corré:
```bash
npx expo install react-native-maps
```

---

## ⚙️ Configuración de Redux

1. Crear `/src/store/locationSlice.ts`:

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LocationState = {
  latitude: number | null
  longitude: number | null
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const { setLocation } = locationSlice.actions
export default locationSlice.reducer
```

2. Crear `/src/store/index.ts`:

```ts
import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

3. Envolvé tu app en `App.tsx`:

```tsx
import { Provider } from 'react-redux'
import { store } from './src/store'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Modal from './src/components/Modal/Modal'
import Map from './src/components/MapView/Map'

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Map />
          <Modal />
          <StatusBar style="auto" />
        </View>
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
```

---

## 🧪 Cómo probar

1. Ejecutá la app:

```bash
npx expo start
```

2. En el modal, ingresá una ubicación como:

```
Maipú Mendoza
```

3. La ubicación se buscará con la API de Nominatim y se mostrará en el mapa.

---

## 🌍 API de Nominatim

Para hacer las solicitudes correctamente:

```ts
const res = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json`,
  {
    headers: {
      'User-Agent': 'MyReactNativeApp (tucorreo@ejemplo.com)',
    },
  }
)
```

> ⚠️ Por buenas prácticas, el `User-Agent` debe incluir tu email o el nombre de tu app.

---

## 🧠 Próximos pasos

- Mostrar un marcador en el mapa con la ubicación buscada
- Guardar historial de ubicaciones buscadas
- Permitir elegir ubicaciones desde el mapa directamente

---

## 🛠 Dependencias principales

- React Native
- Expo
- @reduxjs/toolkit
- react-redux
- react-native-maps
- @gorhom/bottom-sheet

---

## 📝 Licencia

MIT
