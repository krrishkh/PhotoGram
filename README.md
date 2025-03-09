# PhotoGram

PhotoGram is a picture-sharing platform built with a Node.js backend and a React (Vite) frontend. This guide provides step-by-step instructions to set up and run the project on your local system.

## Features

- User Authentication (Signup/Login) with JWT
- Secure Password Handling (bcrypt)
- Image Upload and Storage (Multer + Cloudinary)
- Responsive Frontend with React and Tailwind CSS
- RESTful API with Express

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Project Structure

```
PhotoGram/
├── backend/          # Node.js + Express Backend
└── frontend/         # React + Vite Frontend
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PhotoGram.git
cd PhotoGram
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

#### Environment Configuration

Create a `.env` file in the `backend` directory and add the following variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Start the Backend Server

```bash
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 3. Set Up the Frontend

Open a new terminal window and navigate to the frontend folder:

```bash
cd ../frontend
npm install
```

#### Configure the API Endpoint

Create a `.env` file in the `frontend` directory and add:

```env
VITE_API_URL=http://localhost:5000
```

#### Start the Frontend Server

```bash
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

1. Access the platform at [http://localhost:5173](http://localhost:5173).
2. Sign up or log in to start sharing pictures.

## Key Packages and Their Purpose

### Backend
- **bcrypt**: For securely hashing and verifying user passwords.
- **jsonwebtoken (JWT)**: To generate and verify authentication tokens for user sessions.
- **multer**: Middleware for handling `multipart/form-data`, primarily for image uploads.
- **cloudinary**: For uploading and managing images on the Cloudinary platform.
- **mongoose**: For interacting with MongoDB in an object-oriented way.
- **cookie-parser**: To parse and manage cookies for user authentication.
- **dotenv**: To manage environment variables securely.

### Frontend
- **axios**: For making API requests to the backend.
- **react-router-dom**: For handling client-side routing.
- **tailwindcss**: For efficient, utility-first CSS styling.

## Scripts

### Backend
- `npm start`: Starts the backend server with `nodemon`.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production-ready frontend.

## Troubleshooting

1. Ensure MongoDB is running and the `MONGO_URI` is correct.
2. Verify that Cloudinary credentials are correct for image uploads.
3. Check for CORS errors if requests fail between frontend and backend.

## Author

**Krrish Khandelwal**

Feel free to contribute by opening issues and pull requests!

