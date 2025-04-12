# React Native App con Mapa y Búsqueda de Ubicación usando Redux

<img src="https://github.com/user-attachments/assets/7a4e0b94-bcd2-49ea-bff8-794d3ae61747" alt="Mapa" width="300"/>

![image](https://github.com/user-attachments/assets/82a6c0e5-252f-4b21-a25c-8ebfdc56bc26)

Esta aplicación permite al usuario buscar una ubicación (por ejemplo, "Maipú Mendoza") y mostrarla en un mapa utilizando [GoogleMaps](https://github.com/react-native-maps/react-native-maps) con [Nominatim](https://nominatim.openstreetmap.org/). El estado de la ubicación se maneja globalmente con **Redux Toolkit**.

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

## Gracias por leer.
