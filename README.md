# 🎬 Movie Explorer - CineVerse

![Frontend](https://img.shields.io/badge/Frontend-React%2BTypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-Flask-lightgrey)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)


Movie Explorer is a **full-stack web application** for film enthusiasts to **browse movies, actors, directors, and genres**.  
Users can filter movies by genre, actor, director, or release year, view detailed movie pages, and actor/director profiles.  

This project is built with **React + TypeScript + Material UI** on the frontend and **Flask + PostgreSQL** on the backend, fully **Dockerized** for easy deployment.

---

## 🚀 Features

- Browse movies with **title, release year, genres, director, rating**
- Filter movies by **genre, actor, director, or release year**
- View **detailed movie pages** with cast and genre info
- View **actor/director profiles** with movies they’ve worked on
- Optional: **Favorites / Watch Later** stored in localStorage
- API documented with **Swagger / OpenAPI**

---
## 🧩 System Architecture

```
[ React (Vite) ] → [ Flask REST API ] → [ PostgreSQL ]
| |
TanStack Query SQLAlchemy ORM
|
Redux (UI State)
```
## 🛠 Tech Stack

| Layer        | Technology                                                     |
|-------------|----------------------------------------------------------------|
| Frontend    | React, TypeScript, Material UI, Vite, Framer Motion            |
| State       | Redux Toolkit, TanStack React Query (Server State)             |
| Backend     | Flask, SQLAlchemy, PostgreSQL                                  |
| API Docs    | Swagger (OpenAPI)                                              |
| Container   | Docker, Docker Compose                                         |
| Testing     | React Testing Library, Jest, Pytest                             |


---

## 📂 Project Structure

**Backend**

```
backend/
├── app/
│   ├── config.py        # App configuration (env, DB, settings)
│   ├── extensions/      # Flask extensions (db, migrate)
│   ├── main.py          # Flask app factory / initialization
│   ├── api/             # API blueprints 
│   ├── models/          # SQLAlchemy ORM models
│   ├── routes/          # Route handlers / controllers
│   ├── schemas/         # Serialization & validation (Marshmallow)
│   ├── seeds/           # Database seed scripts / fixtures
│   ├── static/          # Static files (if served by Flask)
│   └── tests/           # Unit & integration tests
├── run.py               # Application entry point
├── requirements.txt     # Python dependencies
└── Dockerfile           # Backend container configuration

```

**Frontend**

```
frontend/
├── src/
│   ├── api/             # API clients / Axios services
│   ├── app/
│   │   └── store.ts     # Redux store configuration
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux slices / feature modules
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page-level components (routes)
│   ├── routes/          # Route definitions / guards
│   ├── tests/           # Frontend tests
│   ├── theme/           # Styling, themes, design tokens
│   ├── types/           # Global TypeScript types
│   ├── App.tsx          # Root React component
│   └── main.tsx         # React entry point
├── Dockerfile           # Frontend container
├── nginx.conf           # Nginx config for production/Dockerisation
├── index.html           # HTML entry
├── eslint.config.js     # Linting config
├── package.json
├── package-lock.json
├── tsconfig*.json       # TypeScript configs
└── vite.config.ts       # Vite config

```


---

## ⚡ Prerequisites

- **Docker & Docker Compose** ([Get Docker](https://www.docker.com/get-started))
- Optional (local setup):
  - Node.js >= 18
  - Python >= 3.10
  - PostgreSQL (local)

  
- **🔐 Environment Variables**

    Create two files:

    ### backend/.env
    
    ```
    FLASK_ENV=development
    DATABASE_URL=postgresql://user:password@localhost:5432/moviedb
    SECRET_KEY=your-secret
    ```


    ### backend/.env.docker
    ```
    FLASK_ENV=production
    DATABASE_URL=postgresql://postgres:postgres@db:5432/moviedb
    ```



---

## 🐳 Running the Project (Docker)

1. **Clone the repository**

```bash
git clone git@github.com:Wahid-ul/Movie-Explorer-Platform.git
cd movie-explorer
```

2. Start all services 


```
docker-compose up --build
```



3. Open in browser

  Frontend: http://localhost:5173/

  Backend API: http://localhost:5000/api/movies/
  
  Swagger UI: http://127.0.0.1:5000/api/docs

4. Stop containers

```
docker-compose down
```



## ⚙️ Running Locally Without Docker

### Backend
```
cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

pip install -r requirements.txt
export FLASK_APP=app.main
flask run
```
## 🗄 Database Migration

```bash
flask db init
flask db migrate -m "Initial tables"
flask db upgrade
```

## Data seeding

```
flask seed
```


### Frontend
```
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints
1. Movies

  GET /api/movies – List movies with optional filters:
?genre=Action&actor=Tom%20Cruise&year=2023&director=Nolan

  GET /api/movies/<id> – Get movie details

2. Actors

  GET /api/actors – List actors (filter by movie/genre)

  GET /api/actors/<id> – Actor profile

3. Directors

  GET /api/directors – List directors

  GET /api/directors/<id> – Director profile

4. Genres

  GET /api/genres – List all genres

  All filtering is handled server-side; frontend only sends filter parameters.

## Frontend Usage

  Browse movies on the homepage

  Use the filter panel to search by actor, genre, or director

  Click a movie card for detailed info

  Click actor/director name to view their profile

  Optional: Mark movies as Favorites / Watch Later (stored in localStorage)

## 🧪 Testing
  
  Backend
```
cd backend
pytest app/tests -v
```

  Frontend

  ```
  cd frontend
npx vitest
```

## 📦 Docker Commands Quick Reference
bash
```
# Build containers
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# Rebuild and force recreate
docker-compose up --build --force-recreate

```
## Bonus: Favorites / Watch Later

  Stored locally in localStorage

  No backend authentication required

  Can be extended to a persistent backend feature

## 💡 Notes

  Backend handles all filtering logic

  API documented via Swagger at /swagger

  Modular, testable, and maintainable architecture

  Error handling implemented for invalid filters or empty results