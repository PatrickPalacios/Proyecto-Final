This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Registro y Gestor de Equipos Deportivos

Descripción General

Este proyecto es una aplicación web diseñada para facilitar el registro, visualización y administración de equipos deportivos, enfocada principalmente en ligas de básquetbol. Ofrece una interfaz intuitiva que permite a los usuarios registrar información detallada de los equipos y jugadores, además de generar documentos PDF con un formato profesional directamente desde la vista previa en pantalla.

Funcionalidades Principales

1. Registro de Equipos

Los usuarios pueden registrar el nombre del equipo y definir el número de jugadores (hasta un máximo de 12).

El formulario incluye campos detallados para cada jugador:

Número del jugador.

Nombre y apellidos.

CURP (Clave Única de Registro de Población).

Teléfono de contacto.

2. Vista Previa en Tiempo Real

Muestra una representación organizada de los datos ingresados del equipo y sus jugadores.

Cada jugador aparece en un recuadro con:

Número de jugador.

Nombre completo.

CURP.

Teléfono.

El diseño es limpio y claro para facilitar la lectura.

3. Generación de PDF

Genera un documento PDF con el mismo formato que la vista previa, asegurando consistencia visual.

Utiliza las librerías html2canvas y jsPDF para capturar la vista y convertirla en un archivo descargable.

4. Persistencia de Datos

Los datos registrados se envían al servidor mediante solicitudes HTTP (integración con un backend).

Muestra notificaciones claras sobre el éxito o los errores durante el registro.

Requisitos del Sistema

Tecnologías Utilizadas

Frontend:

React.js

Chakra UI para el diseño de componentes.

jsPDF y html2canvas para generación de PDF.

Axios para solicitudes HTTP.

Backend:

Endpoint para almacenar datos (simulado en el proyecto actual, pero adaptable a cualquier API REST).

Otros:

Node.js y npm/yarn para la gestión de dependencias.

Dependencias

React 18+

Chakra UI

jsPDF

html2canvas

Axios

Requisitos Previos

Tener instalado Node.js (v14 o superior).

Gestor de paquetes como npm o yarn.

Acceso a un navegador moderno (Google Chrome, Firefox, Edge).

Instalación y Configuración

Clonar el Repositorio

git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio

Instalar Dependencias

npm install

Configuración del Backend

Asegúrate de tener configurado un servidor backend que acepte solicitudes POST en el endpoint /api/teams.

Actualiza el archivo correspondiente si es necesario (por ejemplo, variables de entorno o rutas API).

Iniciar el Proyecto

npm start

Uso de la Aplicación

Registrar un Equipo

Completa el formulario en el lado izquierdo con los datos del equipo.

Ingresa los datos de los jugadores:

Número, nombre, CURP y teléfono.

Haz clic en "Guardar Equipo" para enviar los datos al servidor.

Descargar el PDF

Verifica la vista previa del equipo registrado en el lado derecho de la pantalla.

Haz clic en "Descargar PDF" para obtener la cédula de inscripción con el formato visual del sistema.

Extensiones Futuras

Autenticación de usuarios.

Edición de equipos y jugadores.

Soporte para múltiples torneos.

Validaciones avanzadas (formato de CURP, email, etc.).

Reportes personalizados para administradores.

Contribuciones

Si deseas contribuir a este proyecto:

Realiza un fork del repositorio.

Crea una rama para tu nueva funcionalidad: git checkout -b feature/nueva-funcionalidad.

Envía un pull request detallado.