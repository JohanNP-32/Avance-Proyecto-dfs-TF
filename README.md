# 💎 TOM FORD - E-COMMERCE 

Una aplicación web Full Stack que replica la experiencia de compra de lujo de Tom Ford. Este proyecto simula un entorno de comercio electrónico completo con gestión de inventario en tiempo real, autenticación de usuarios segura y una interfaz de usuario premium y responsiva.

---

## 🚀 Características Principales
* **Experiencia de Usuario:** Diseño minimalista y elegante fiel a la marca.
* **Catálogo Dinámico:** Visualización de productos con precios y stock actualizados desde la base de datos.
* **Gestión de Inventario Real:** El sistema descuenta el stock (50ml o 100ml) automáticamente al confirmar una compra.
* **Carrito de Compras Inteligente:** Lógica completa para añadir, eliminar y calcular totales en tiempo real.
* **Seguridad:** Registro e inicio de sesión con encriptación de contraseñas (bcrypt).
* **Responsive Design:** Menú de navegación adaptativo (Menú Hamburguesa) para móviles y tablets.

---

## 🛠️ Stack Tecnológico
* **Frontend:** React.js, Vite, CSS3 (Diseño Personalizado).
* **Backend:** Node.js, Express.js.
* **Base de Datos:** MySQL.
* **Seguridad:** BCrypt (Encriptación), CORS (Seguridad de red).

---

## 📖 Manual de Instalación y Ejecución
Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Prerrequisitos
Asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (Versión LTS recomendada).
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) y Workbench.
* Git.

### 2. Configuración de la Base de Datos
1.  Abre **MySQL Workbench**.
2.  Crea una nueva base de datos llamada `tomford_db`.
3.  Ejecuta el script SQL proporcionado en el archivo `database.sql` para crear las tablas `productos` y `usuarios`.

**IMPORTANTE:** Crea un archivo llamado `.env` en la raíz de la carpeta `backend` con el siguiente contenido:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=TU_CONTRASEÑA_DE_MYSQL
    DB_NAME=tomford_db (nombre de tu base de datos)
    PORT=5000 (el puerto disponible en tu dispositivo)

### 3. Configuración del Backend (Servidor)
1.  Abre una terminal y navega a la carpeta del servidor:
    ```bash
    cd backend
    ```
2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
3.   Instala las dependencias necesarias:
    ```bash
    npm install express mysql2 cors bcrypt dotenv jsonwebtoken
    ```
5.  Inicia el servidor:
    ```bash
    node server.js
    ```
    *Deberás ver el mensaje: "Base de datos corriendo en puerto 5000".*

### 4. Configuración del Frontend (Cliente)
1.  Abre una **nueva terminal** y navega a la carpeta del cliente:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación web:
    ```bash
    npm run dev
    ```
4.  Abre el enlace que aparece en la terminal (ej. `http://localhost:5173`) en tu navegador.

---

## 🧪 Guía de Uso Rápido
### Registrarse e Iniciar Sesión
1.  Haz clic en el botón **"CUENTA"** en el menú superior.
2.  Selecciona la pestaña **"CREAR CUENTA"**.
3.  Ingresa tu nombre, correo y contraseña. El sistema te logueará automáticamente.

### Realizar una Compra
1.  Navega por el catálogo de fragancias.
2.  Selecciona un tamaño (**50ML** o **100ML**) en la tarjeta del producto.
3.  Haz clic en **"AÑADIR AL CARRITO"**.
4.  Abre el ícono de la **Bolsa de Compras** (esquina superior derecha).
5.  Revisa tu pedido y haz clic en **"FINALIZAR COMPRA"**.
6.  *Verificación:* Si revisas la base de datos, verás que el stock del producto ha disminuido.

---

## 🐛 Solución de Problemas 
| Problema | Solución |
| :--- | :--- |
| **Error "Failed to fetch"** | El backend no está corriendo. Asegúrate de ejecutar `node server.js` en una terminal aparte. |
| **Error de conexión a BD** | Revisa que la contraseña en tu archivo `.env` sea la misma que usas para entrar a MySQL Workbench. |
| **Problemas en Mac** | El backend está configurado en el puerto **4000** intencionalmente para evitar conflictos con AirPlay (Puerto 5000) en macOS. No cambies el puerto. |
| **Imágenes no cargan** | Asegúrate de que las imágenes estén en la carpeta `public/img` del frontend. |

---

**Desarrollado por:** [HTMLovers]
