# Ja Som Aki 0.0

**Ja Som Aki** es una aplicación de gestión de eventos donde los administradores pueden organizar eventos y gestionar la inscripción de participantes, incluyendo la gestión de las tallas de trajes para cada evento.

## 📰 Descripción

La aplicación permite a los administradores crear y gestionar eventos, mientras que los usuarios pueden inscribirse en estos eventos. Los administradores también pueden asignar y observar las tallas de los trajes que los participantes usarán en los eventos e descargarlo en PDF. La aplicación está construida con React y Vite en el frontend pensada, y una API en PHP con MySQL en el backend.

### 🎨 Diseño y Responsividad
- **Usuarios  (Mobile-First) 📱** :La sección de usuarios está diseñada pensando en la experiencia móvil primero. Esto significa que la interfaz se adapta y optimiza principalmente para dispositivos móviles, garantizando que todas las funcionalidades sean accesibles y usables en pantallas pequeñas.

- **Administradores (Desktop-First) 🗔** :La parte administrativa de la aplicación está optimizada para pantallas de escritorio. Esto permite una mejor organización de las funcionalidades y una interfaz más completa para la gestión de eventos y participantes en un entorno de escritorio.


## ⚡ Tecnologías utilizadas

- **Frontend**: React con Vite
- **Backend**: PHP con MySQL
- **Estilos**: CSS
- **Gestión de estado y manejo de tokens**: React Hooks y `sessionStorage`
- **Entorno de desarrollo**: Node.js, Vite
- **Despliegue**: Puede ser desplegado en cualquier servidor que soporte PHP y MySQL

## 🛠️ Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- NPM (v6 o superior) o Yarn
- Servidor web compatible con PHP (como XAMPP, WAMP, o LAMP)
- Composer
- MySQL o MariaDB

## ⚙️ Instalación

### 🌐 Frontend

1. Clona este repositorio:

   ```bash
   git clone https://github.com/zepe0/jasomaki.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd jasomaki
   ```

3. Instala las dependencias del frontend:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

   ```bash
   VITE_API_URL=http://tu-servidor/api
   ```

5. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

### 💻 Backend 

1. Configura tu servidor web para que apunte a la carpeta `api` en el directorio del proyecto.
   ```bash
   vite.config.js
   ```
2. Importa la base de datos:

   - Crea una base de datos en MySQL.
     ![Base de Datos](/src/img/bd.png)

3. Configura las variables de entorno para la conexión a la base de datos en un archivo de configuración (modelo ENV):

4. Asegúrate de que las rutas de la API estén configuradas correctamente en tu servidor para responder a las solicitudes desde el frontend.

## 🚀 Uso 
### Para usuarios 📱

- Los usuarios pueden registrarse en los eventos creados por el administrador.
- Los usuarios deben estar autenticados para inscribirse en un evento.
- Después de la inscripción, pueden gestionar el traje que se usara en los eventos en los que están registrados.

### Para administradores 💻

- Los administradores pueden crear, editar y eliminar eventos.
- También pueden ver las tallas de los trajes para cada participante en los eventos.
- También pueden eliminar participante.
- Los administradores tienen acceso a la gestión completa de los participantes y sus datos.

## 📋 TODO's

`- []`Implementar Pagos.

`- []`Administrador gestione tallas para usuarios.

`- []`Añadir Inscripciones para los menores asociados al Usuario Mayor( Padre/ Madre / Tutor).

`- []`Horarios para maquillajes.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu nueva característica (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Sube tu rama (`git push origin feature/nueva-caracteristica`).
5. Crea un Pull Request.
## 📝 Autor

[Aitor Arpa](https://github.com/zepe0)
## 📧 Contacto

Para cualquier consulta o problema, puedes contactar con el autor Aitor a través del correo electrónico: [aitor.zepe@gmail.com](mailto:aitor.zepe@gmail.com).
