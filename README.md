Microservicio de Cartelera de Cine

Descripción
-----------
Este es un microservicio backend en Node.js para gestionar la cartelera de un cine. Permite:
- Importar películas desde la API de TMDB.
- Crear funciones.
- Consultar sillas disponibles.
- Reservar boletas.
Usa principios SOLID y DDD, Sequelize con MariaDB (XAMPP localmente), pruebas con Jest, está dockerizado y preparado para Kubernetes.

Requisitos
----------
- Node.js 18+
- Docker Desktop
- XAMPP (MariaDB)
- TMDB API Key (19800010c672505994853080d5177380)
- kubectl (opcional, para Kubernetes)

Instalación Local
-----------------
1. Descargar y descomprimir el código.

2. Instalar dependencias:
   npm install

3. Configurar XAMPP:
   - Iniciar MariaDB desde XAMPP Control Panel.
   - En http://localhost/phpmyadmin, crear base de datos 'cinema'.

4. Configurar .env en la raíz:
   TMDB_API_KEY=tu_api_key_aqui
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=cinema

5. Ejecutar migraciones:
   npx sequelize-cli db:migrate

6. Otorgar permisos al usuario para el host:
   - En phpMyAdmin o el cliente MySQL de XAMPP, ejecutar:
     GRANT ALL PRIVILEGES ON cinema.* TO 'root'@'localhost' IDENTIFIED BY '';
     GRANT ALL PRIVILEGES ON cinema.* TO 'root'@'host.docker.internal' IDENTIFIED BY '';
     FLUSH PRIVILEGES;

7. Iniciar servidor:
   npm start
   La API estará en http://localhost:3000/api

Uso con Docker
--------------
1. Asegurar que MariaDB (XAMPP) esté corriendo.
2. En .env, cambiar a:
   DB_HOST=host.docker.internal
3. Construir y ejecutar:
   docker compose up --build -d
4. Verificar logs:
   docker compose logs app
5. Acceder a la API en http://localhost:3000/api
6. Detener:
   docker compose down

Endpoints de la API
------------------
- GET /api/movies/import?category=popular
  Descripción: Importa películas desde TMDB
  Ejemplo: curl http://localhost:3000/api/movies/import?category=popular

- POST /api/showtimes
  Descripción: Crea una función
  Cuerpo: {"movieId":1,"room":"Sala 1","date":"2025-06-01","time":"18:00:00","totalCapacity":50}
  Ejemplo: Invoke-WebRequest -Uri http://localhost:3000/api/showtimes -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"movieId":1,"room":"Sala 1","date":"2025-06-01","time":"18:00:00","totalCapacity":50}'

- GET /api/showtimes/:showtimeId/seats
  Descripción: Consulta sillas disponibles
  Ejemplo: curl http://localhost:3000/api/showtimes/1/seats

- POST /api/tickets
  Descripción: Reserva una boleta
  Cuerpo: {"showtimeId":1,"buyer":"Juan Perez"}
  Ejemplo: Invoke-WebRequest -Uri http://localhost:3000/api/tickets -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"showtimeId":1,"buyer":"Juan Perez"}'

Pruebas
-------
Ejecutar pruebas unitarias:
   npm test

Despliegue en Kubernetes
-----------------------
1. Actualizar kubernetes/configmap.yaml con TMDB_API_KEY.
2. Aplicar manifiestos:
   kubectl apply -f kubernetes/
Nota: DB_HOST=host.docker.internal es para pruebas locales con XAMPP. En producción, usar un servicio de base de datos (ej. MySQL en un pod).

Solución de Problemas
---------------------
- Error 'node-fetch': Usé node-fetch@2.7.0 para compatibilidad con CommonJS.
- Error 'this.tmdbService.getPopularMovies is not a function': Corregí instanciación de TmdbService en cinemaService.js.
- Error 'Host host.docker.internal is not allowed': Configuré permisos en MariaDB para host.docker.internal.
- Error 'Cannot read properties of undefined (reading transaction)': Importé Sequelize en cinemaService.js y usé Sequelize.LOCK.UPDATE.
- Error 'TypeError: Class constructor Category cannot be invoked without new': Ajusté models/index.js y modelos con sequelize.define.
- Error 'CinemaService.reserveTicket is not a function': Corregí cinemaController.js para instanciar CinemaService.
- Manifiestos Kubernetes vacíos: Creé deployment.yaml, service.yaml, configmap.yaml, ingress.yaml con configuraciones correctas.
- Error 'Please install mysql2 package manually': Instalé mysql2 con 'npm install mysql2' para conexión local con Sequelize.

Uso de IA
---------
Utilicé Grok (creado por xAI) para generar plantillas de código y documentación, revisadas y adaptadas manualmente.

Video de la Sesión
-----------------
https://www.loom.com/share/5fb0394b652b488dba37cc30b422aed3?sid=35d6442f-752e-4d10-bce7-c8e8c632c7d7

Autor
-----
[Juan Esteban Galvis Mora]