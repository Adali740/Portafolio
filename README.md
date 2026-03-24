# Mi Portafolio

Un portafolio personal con panel de administrador para gestionar proyectos, certificados y línea de tiempo.

## Configuración

### 1. Supabase
- Crea una cuenta en [Supabase](https://supabase.com)
- Crea un nuevo proyecto
- Ve a SQL Editor y ejecuta los siguientes scripts para crear las tablas:

```sql
CREATE TABLE administrador (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE proyecto (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    url_github VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE certificado (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    urlimage VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE linea_de_tiempo (
    id SERIAL PRIMARY KEY,
    foto_mia VARCHAR(255),
    año INT NOT NULL
);

-- Inserta un administrador (cambia nombre y contraseña)
INSERT INTO administrador (nombre, contraseña) VALUES ('admin', 'password123');
```

- Ve a Settings > API y copia la URL y la anon key.

### 2. Backend
- Copia `backend/.env.example` a `backend/.env`
- Rellena las variables con tus credenciales de Supabase
- Instala dependencias: `cd backend && npm install`
- Ejecuta: `npm run dev`

### 3. Frontend
- Para desarrollo local, instala un servidor simple: `cd frontend && npm install && npm start`
- O abre `frontend/public/index.html` directamente en el navegador (pero las llamadas API fallarán sin el backend)

### 4. Despliegue en Vercel
- Instala Vercel CLI: `npm i -g vercel`
- Ejecuta `vercel` en la raíz del proyecto
- Configura las variables de entorno en Vercel Dashboard
- Despliega

## Uso
- Visita la página principal para ver el portafolio
- Ve a `/admin` para acceder al panel de administrador
- Usa las credenciales que configuraste para login