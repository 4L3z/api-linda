
# API Linda

## Descripción

Este proyecto es una API construida con Node.js y Express que permite crear y gestionar datos de alumnos activos y las transformaciones de Lucio Chad. Los datos se almacenan en archivos JSON, lo que permite su persistencia.

## Características

- **Almacenamiento en Archivos JSON**: Los datos se guardan en archivos `alumnos2024.json` y `luciochad.json`. Que se encuentran en la carpeta `data`
- **Interfaz de Usuario**: La API está acompañada de un frontend simple que permite enviar datos a la API.

## Requisitos

- [Node.js](https://nodejs.org/)
- NPM (que viene incluido con Node.js)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/4L3z/api-linda.git
   cd api-linda
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Asegúrate de que tu estructura de archivos sea la siguiente:

```
api-linda/ 
├── data/ 
│ ├── alumnos2024.json 
│ └── luciochad.json 
├── public/ 
│    ├── index.html
|    ├── styles.css
│    └── script.js
├── server.js 
├── package-lock.json
└── package.json
```

## Uso

1. Inicia el servidor:

   ```bash
   npm run dev
   ```

2. Abre tu navegador y ve a `http://localhost:3000` para acceder a la interfaz de usuario.

3. Envía datos a través del formulario para los alumnos y las transformaciones de Lucio Chad. Los datos se guardarán en sus respectivos archivos JSON.

## Endpoints

### POST `/alumnos`

Guarda los datos de alumnos en `alumnos2024.json`.

**Cuerpo de la solicitud**:
```json
{
  "title": "Según {el nombre del usuario}, Los {números de alumnos} alumnos más activos en la clase son",
  "alumnos": [
    "alumno1",
    "alumno2",
    "alumno3"
  ]
}
```

### POST `/luciochad`

Guarda las transformaciones de Lucio Chad en `luciochad.json`.

**Cuerpo de la solicitud**:
```json
{
  "0": {
    "title": "Lucio Chad",
    "description": "En su forma base...",
    "level": 0,
    "image": "https://i.ibb.co/S3G9qR8/lucio-chad-base.jpg"
  },
}
```
