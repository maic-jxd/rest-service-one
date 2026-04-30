# 🚀 Rest Service One

API REST construida con **Node.js + Express 5 + MongoDB (Mongoose)**. Permite gestión de usuarios y publicación de posts con soporte para carga de archivos vía **ImageKit**.

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | v22+ | Runtime |
| Express | v5 | Framework HTTP |
| Mongoose | v9 | ODM para MongoDB |
| bcrypt | v6 | Hash de contraseñas |
| jsonwebtoken | v9 | Autenticación JWT |
| multer | v2 | Carga de archivos (memoria) |
| ImageKit | v6 | Almacenamiento de archivos en la nube |

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd rest-service-one

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor en desarrollo
npm run dev
```

---

## 🔐 Variables de entorno

```env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<db>
JWT=tu_secreto_jwt

IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/tu_id
```

---

## 📁 Estructura del proyecto

```
rest-service-one/
├── index.js                  # Entry point
├── Dockerfile
├── .env
└── src/
    ├── server.js             # Clase Servidor (Express config)
    ├── config/
    │   ├── database.js       # Conexión MongoDB
    │   └── imagekit.js       # Instancia ImageKit
    ├── models/
    │   ├── user.model.js     # Schema Usuario
    │   └── post.model.js     # Schema Post
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   └── post.controller.js
    ├── middlewares/
    │   ├── verifyAuth.js     # JWT + rol admin
    │   ├── verifyPost.js     # Verificar dueño del post
    │   └── uploadFile.js     # Multer (memoria)
    ├── helpers/
    │   └── bcrypt.js         # Encrypt / Decrypt
    └── routes/
        ├── index.js          # Router principal
        ├── users.routes.js
        └── posts.routes.js
```

---

## 🔑 Autenticación

La API usa **JWT** enviado en el header de cada request protegido:

```
x-access-token: <tu_token>
```

El token se obtiene haciendo login en `POST /api/auth`. Expira en **1 hora**.

---

## 📡 Endpoints

### Auth

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `POST` | `/api/auth` | ❌ | Login — retorna JWT |
| `GET` | `/api/main` | ✅ | Obtiene el usuario autenticado |

---

### Users

| Método | Ruta | Auth | Rol | Descripción |
|---|---|---|---|---|
| `POST` | `/api/user` | ❌ | — | Registro de nuevo usuario (Forzado a rol `user`) |
| `GET` | `/api/user` | ✅ | `admin` | Lista todos los usuarios registrados |
| `GET` | `/api/user/:id` | ✅ | — | Obtiene un usuario por ID (sin password) |
| `PUT` | `/api/user/:id` | ✅ | — | Actualiza un usuario |
| `DELETE` | `/api/user/:id` | ✅ | — | Elimina un usuario |

> **Nota sobre seguridad**: La creación de administradores se realiza directamente en la base de datos para máxima simplicidad y seguridad del sistema.

---

### Posts

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `GET` | `/api/posts` | ❌ | **Feed Público**: Todos los posts (solo `description` y `url`) |
| `GET` | `/api/post` | ✅ | **Mis Posts**: Lista posts del usuario autenticado (full data) |
| `POST` | `/api/post` | ✅ | Crea un post con archivo (ImageKit) |
| `GET` | `/api/post/:id` | ✅ dueño | Obtiene un post específico por ID |
| `PUT` | `/api/post/:id` | ✅ dueño | Actualiza un post y su imagen |
| `DELETE` | `/api/post/:id` | ✅ dueño | Elimina post y archivo de la nube |

---

## 🐳 Docker

```bash
# Build
docker build -t rest-service-one .

# Run
docker run -p 4000:4000 --env-file .env rest-service-one
```

---
