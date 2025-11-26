# 🎵 Mini Spotify API

API REST para gestión de canciones, artistas, playlists y usuarios con sistema de autenticación JWT.

---

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta
```

### 3. Crear base de datos

```bash
npm run db:sync
```

Este comando crea la base de datos con datos de ejemplo y un usuario administrador:

- Email: `admin@admin.com`
- Contraseña: `admin123`

### 4. Iniciar servidor

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📚 Uso del API

### Autenticación

Todas las rutas (excepto login y register) requieren autenticación JWT mediante cookies.

**1. Registrar usuario:**

```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "mail": "juan@example.com",
  "pass": "password123"
}
```

**2. Iniciar sesión:**

```bash
POST /api/users/login
Content-Type: application/json

{
  "mail": "admin@admin.com",
  "pass": "admin123"
}
```

El token JWT se almacena automáticamente en una cookie HttpOnly.

---

### Endpoints Principales

**Usuarios:**

- `GET /api/users` - Listar usuarios (Admin)
- `GET /api/users/me` - Usuario actual
- `PUT /api/users/:id` - Actualizar usuario (Admin)
- `DELETE /api/users/:id` - Eliminar usuario (Admin)

**Canciones:**

- `GET /api/canciones` - Listar canciones
- `GET /api/canciones/:id` - Obtener canción
- `POST /api/canciones` - Crear canción (Admin)
- `PUT /api/canciones/:id` - Actualizar canción (Admin)
- `DELETE /api/canciones/:id` - Eliminar canción (Admin)
- `GET /api/canciones/search?query=término` - Buscar canciones

**Artistas:**

- `GET /api/artistas` - Listar artistas
- `GET /api/artistas/:id` - Obtener artista
- `POST /api/artistas` - Crear artista (Admin)
- `PUT /api/artistas/:id` - Actualizar artista (Admin)
- `DELETE /api/artistas/:id` - Eliminar artista (Admin)
- `GET /api/artistas/search?query=término` - Buscar artistas

**Playlists:**

- `GET /api/playlists` - Listar playlists (Admin)
- `GET /api/playlists/:id` - Obtener playlist
- `POST /api/playlists` - Crear playlist
- `PUT /api/playlists/:id` - Actualizar playlist (Admin)
- `DELETE /api/playlists/:id` - Eliminar playlist (Admin)

**Canciones en Playlists:**

- `POST /api/playlists/:playlistId/canciones` - Agregar canción
- `GET /api/playlists/:playlistId/canciones` - Listar canciones
- `DELETE /api/playlists/:playlistId/canciones/:cancionId` - Quitar canción

---

## Roles

- **Admin** (`roleId: 1`): Acceso completo
- **User** (`roleId: 2`): Acceso limitado (por defecto)

---

## Tecnologías

- Node.js + Express
- Sequelize (SQLite)
- JWT + bcrypt
- Cookie-parser

---

## Scripts

```bash
npm run dev      # Modo desarrollo con auto-reload
npm start        # Modo producción
npm run db:sync  # Crear/sincronizar base de datos
```
