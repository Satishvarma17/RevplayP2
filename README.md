# RevPlay (FinalProject P2)

RevPlay is a full-stack music platform with:
- `backend`: Spring Boot REST API
- `frontend`: Angular application

## Features
- Authentication and authorization (USER / ARTIST)
- Browse public songs
- Favorites management
- Playlist management
- User profile management
- Artist module (dashboard, upload song, manage albums, profile)
- Music player and listening history

## Project Structure
- `backend/` : Java Spring Boot service
- `frontend/` : Angular client

Frontend modules are under `frontend/src/app/modules`:
- `auth`
- `music/browse`
- `user` (`profile`, `favorites`, `playlists`, `dashboard`)
- `artist`
- `player`
- `history`

## Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- npm 9+

## Run Backend
From project root:

```powershell
cd backend
mvn spring-boot:run
```

Backend runs on your configured Spring Boot port (check `backend/src/main/resources/application.properties`).

## Run Frontend
From project root:

```powershell
cd frontend
npm install
npm start
```

For production build:

```powershell
cd frontend
npm run build
```

## Default App Routes
- `/home/login`
- `/home/register`
- `/browse`
- `/favorites`
- `/playlists`
- `/profile`
- `/player`
- `/history`
- `/artist/*`

## Notes
- Search/filter controls are available in the top navigation for USER role.
- Playlist UI is arranged with create section on top and playlist cards in grid below.
- Ensure backend is running before using authenticated frontend flows.
