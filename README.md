# Proyecto: API de Productos Similares

Este proyecto consta de dos aplicaciones desarrolladas con **Node.js** y **Express.js**:

1. **`app.js`**: La aplicación principal.
2. **`server.js`**: Una aplicación de prueba para desarrollo local.

## Descripción de `app.js`
La aplicación `app.js` es la API principal que se encarga de:
- Obtener los IDs de productos similares desde un endpoint.
- Consultar los detalles de cada producto similar.
- Devolver una lista con la información de los productos similares.

## Descripción de `server.js`
`server.js` es una aplicación de prueba utilizada solo para desarrollo local. Esta app simula los datos mock necesarios para probar `app.js` antes de integrarla con la API real dentro del contenedor Docker.

## Scripts disponibles
Los siguientes scripts están definidos en el `package.json` para ejecutar la aplicación:

- **`npm run start`**: Ejecuta `app.js` en modo producción.
- **`npm run dev`**: Ejecuta `app.js` en modo desarrollo con `nodemon`, lo que permite detectar cambios automáticamente.
- **`npm run server`**: Inicia `server.js` como una API de prueba para desarrollo local.

## Uso
### 1. Ejecutar la API en desarrollo con datos mock
```sh
npm run server & npm run dev
```
Esto iniciará `server.js` en segundo plano y ejecutará `app.js` en modo desarrollo.

### 2. Ejecutar la API en producción
```sh
npm run start
```
Este comando iniciará `app.js`, que se usará dentro del contenedor Docker.

## Notas
- `server.js` es solo para pruebas y **no será utilizado en producción**.
- En el entorno real, `app.js` se conectará a una API ya desplegada en lugar de `server.js`.

## Diagrama Explicativo Adicional

A continuación, se presenta un diagrama de flujo de la aplicación. **Este diagrama no sigue estrictamente un diseño de patrones de software UML**, pero proporciona una representación visual clara del funcionamiento del sistema:

![Diagrama de flujo de la API](/diagrama%20_use-case.png)

