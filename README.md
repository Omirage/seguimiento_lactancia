# Seguimiento de Lactancia v2

## Archivos
- index.html — App completa
- manifest.json — Config PWA
- sw.js — Service Worker
- netlify.toml — Config Netlify

## Configurar Firebase (sincronización real)

1. Ir a console.firebase.google.com → Crear proyecto
2. Activar Firestore Database (modo producción)
3. Activar Authentication → Sign-in method → Anónimo
4. Reglas Firestore: allow read, write: if request.auth != null;
5. Configuración del proyecto → Tus apps → Web → copiar firebaseConfig
6. Pegar en index.html en el bloque "FIREBASE CONFIG"

## Deploy en Netlify

Drag & Drop: Arrastrar la carpeta a app.netlify.com

## Instalar en iOS

Safari → Compartir → "Añadir a pantalla de inicio"
Requiere iOS 16.4+ para notificaciones.

## Modo sin Firebase

Si Firebase no está configurado, la app funciona en modo local
guardando datos en localStorage del dispositivo.
