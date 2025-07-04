# backend_controlDeStock - API REST para Gestión de Stock

Este proyecto es el backend de una aplicación diseñada para la gestión de stock, desarrollado con **Node.js** y el framework **Express**. Proporciona una **API RESTful** robusta y segura para manejar operaciones relacionadas con el inventario, usuarios y posiblemente otros recursos del sistema.

## Tecnologías Principales

* **Node.js**: Entorno de ejecución para JavaScript.
* **Express.js**: Framework web para Node.js, utilizado para construir la API REST.
* **MongoDB**: Base de datos NoSQL, para el almacenamiento de datos.
* **Mongoose**: ODM (Object Data Modeling) para MongoDB en Node.js, que facilita la interacción con la base de datos.

## Características Clave

* **Autenticación y Autorización de Usuarios**:
    * Implementación de JSON Web Tokens (JWT) para la gestión de sesiones.
    * Manejo seguro de contraseñas mediante **Bcrypt.js**.
* **Validación de Datos**: Utiliza **Express-Validator** para asegurar la integridad de los datos de entrada en las solicitudes.
* **Gestión de Archivos**: Incorpora **Multer** para el manejo de subida de archivos (por ejemplo, imágenes de productos).
* **Logging de Solicitudes**: Usa **Morgan** para registrar las solicitudes HTTP, útil para depuración y monitoreo.
* **Variables de Entorno**: Configuración de variables de entorno con **Dotenv** para una gestión segura y flexible de la configuración.

## Estructura del Proyecto

El backend sigue una estructura modular, con un archivo `index.js` principal que arranca el servidor.
Este backend tiene los modelos, controladores y rutas protegidas. Permite realizar el CRUD de usuarios y de productos.

## Cómo Iniciar el Proyecto

Para poner en marcha este backend localmente, sigue estos pasos:

1.  **Clona el repositorio:**
   
2.  **Instala las dependencias:**
    
3.  **Ejecuta npm run dev**