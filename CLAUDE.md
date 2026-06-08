# Comidas PWA

App mobile-first de planificación de cenas semanales para Willy, Yani y Feli (7).

## Contexto del hogar

- Se cocina una vez por día (noche). La cena del día N es el almuerzo del día N+1.
- Feli come lo mismo que los adultos salvo que el plato tenga variante marcada.
- Sin ultraprocesados. Única excepción tolerada: tapa de tarta.
- Orientación suave a bajo en carbohidratos, sin regla estricta.
- Comidas típicas argentinas.

## Stack

- React + Vite
- Firebase Firestore (base de datos en tiempo real)
- vite-plugin-pwa (manifest + service worker)
- Sin librerías de UI — todo inline styles, diseño propio

## Estructura del proyecto

```
comidas-pwa/
├── CLAUDE.md
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── manifest.json
│   └── icons/           ← iconos PWA (192x192, 512x512)
└── src/
    ├── main.jsx
    ├── App.jsx            ← componente raíz, routing entre tabs
    ├── firebase.js        ← init Firebase, export db
    ├── data/
    │   └── comidas.js     ← catálogo de platos con ingredientes y proveedores
    ├── components/
    │   ├── Btn.jsx        ← botón reutilizable
    │   ├── BottomNav.jsx  ← navegación inferior por tabs
    │   └── Selector.jsx   ← bottom sheet para elegir comida del día
    └── views/
        ├── SemanaView.jsx
        ├── ComprasView.jsx
        └── HistorialView.jsx
```

## Estado actual

La app está conectada a Firestore: la semana activa y el historial viven en la
colección `semanas` y se sincronizan en tiempo real entre dispositivos.

- Semana: 7 días Dom→Sáb, recomendación automática por rotación, selector de comida con búsqueda, opción de comida custom
- Compras: lista agrupada por proveedor (carnicería / verdulería / supermercado / dietética / fiambrería), checkbox por ítem, botón compartir
- Historial: semanas guardadas, expandibles, leídas desde Firestore

## Próximos pasos en orden

1. ~~Migrar a Firestore~~ — hecho para la colección `semanas` (semana activa + historial)
2. Editar catálogo desde la app — CRUD de platos sin tocar código (hoy vive en `data/comidas.js`)
3. Variante Feli — toggle por día en SemanaView
4. Recordatorios de prep previa — campo `prep_previa` por plato (ej: "remojar lentejas 1 día antes")
5. Freezer — marcar si sobró y se frisó, inventario, usar del freezer en recomendación

Ver backlog completo en `comidas-pwa-backlog.md`.

## Modelo de datos Firestore

### Colección `comidas` (futuro — hoy es estático en `data/comidas.js`)
```js
{
  id: 'guiso_lentejas',
  nombre: 'Guiso de lentejas',
  cat: '🥦 Otros',
  ings: [
    { nombre: 'lentejas', proveedor: 'dietetica' },
    { nombre: 'cebolla',  proveedor: 'verduleria' },
    // ...
  ],
  prep_previa: 'Remojar lentejas la noche anterior',  // null si no aplica
  comprar_mismo_dia: [],                               // ings perecederos
  feli_variante: null,                                 // texto o null
  tags: ['legumbre', 'carbohidrato'],                 // para perfil nutricional futuro
}
```

### Colección `semanas`
```js
{
  id: 'sem_20260607',
  label: 'Semana 7/6',
  createdAt: timestamp,
  activa: true,        // true = semana en curso (se muestra en "Semana"), false = archivada en "Historial"
  dias: [
    { d: 'Dom', comidaId: 'asado', custom: null, freezer: false },
    { d: 'Lun', comidaId: null,    custom: 'Empanadas', freezer: false },
    // ...
  ]
}
```

### Colección `freezer` (futuro)
```js
{
  id: auto,
  comidaId: 'guiso_lentejas',
  nombre: 'Guiso de lentejas',
  fechaIngreso: timestamp,
  usado: false,
}
```

## Convenciones

- Proveedores válidos: `carniceria`, `verduleria`, `supermercado`, `dietetica`, `fiambreria`
- Días: `Dom`, `Lun`, `Mar`, `Mié`, `Jue`, `Vie`, `Sáb`
- Colores definidos en objeto `C` en App.jsx (exportado y compartido por todas las vistas) — no cambiarlos sin revisar todas las vistas
- Botones siempre con `<button>` nativo, nunca `<form>`
- Sin librerías de componentes externas

## Firebase

El proyecto de Firebase es nuevo, separado del dashboard de finanzas personales.
La config va en `src/firebase.js` — no commitear credenciales, usar `.env`
(ver `.env.example` para las variables necesarias):

```js
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';

const app = initializeApp({
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
});

export const db = getFirestore(app);
```

## Lo que NO hacer

- No agregar librerías de UI (Tailwind, MUI, Chakra, etc.) — el diseño está resuelto con inline styles
- No cambiar la paleta de colores sin validar con Willy
- No agregar autenticación por ahora — la app es monousuario local
- No calcular calorías ni valores nutricionales exactos — solo etiquetas cualitativas
