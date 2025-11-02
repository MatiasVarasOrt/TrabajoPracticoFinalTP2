# 🎵 Mini Spotify API

Trabajo práctico final de Taller de Programación II – Node.js, Express y Sequelize

API REST para gestión de canciones, playlists y usuarios de un sistema tipo Spotify.

---

## 📋 Tecnologías Utilizadas

- **Node.js** (v16+)
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **SQLite3** - Base de datos local
- **dotenv** - Gestión de variables de entorno

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasVarasOrt/TrabajoPracticoFinalTP2.git
cd TrabajoPracticoFinalTP2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

El proyecto ya incluye el archivo `.env` configurado. Si necesitas modificarlo:

```env
PORT=3000
NODE_ENV=development
```

### 4. Crear la base de datos e insertar datos de ejemplo

```bash
npm run db:sync
```

Este comando:

- ✅ Crea la base de datos SQLite
- ✅ Crea las tablas necesarias
- ✅ Inserta 5 canciones de ejemplo

### 5. Iniciar el servidor

**Modo desarrollo (con auto-recarga):**

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📚 Endpoints Disponibles

### **Canciones**

| Método   | Endpoint                              | Descripción                           |
| -------- | ------------------------------------- | ------------------------------------- |
| `GET`    | `/api/canciones`                      | Obtener todas las canciones           |
| `GET`    | `/api/canciones/:id`                  | Obtener una canción por ID            |
| `GET`    | `/api/canciones/search?query=término` | Buscar canciones por nombre o artista |
| `POST`   | `/api/canciones`                      | Crear una nueva canción               |
| `PUT`    | `/api/canciones/:id`                  | Actualizar una canción                |
| `DELETE` | `/api/canciones/:id`                  | Eliminar una canción                  |

---
