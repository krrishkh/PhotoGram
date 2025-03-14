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
PORT=5000
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

MONGODB_URI=your_mongodb_uri

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




## 🚀 Features

1. **Homepage**  
   - Two main buttons:
     - **Explore**: View uploaded images.  
     - **Upload**: Navigate to the image upload page.
    
  ![image](https://github.com/user-attachments/assets/b99f55ae-0e65-4d56-875c-78d793d6105c)

2. **Login Page**  
   - Secure user authentication.  
   - Access control to the upload feature.
     
  ![image](https://github.com/user-attachments/assets/21d4371a-f4e7-4954-978a-8b2356fc30b8)


3. **Image Upload Page**  
   - Upload images with ease.  
   - Stores and manages uploaded images on the server.
   - can upload by image url or local storage.

  ![image](https://github.com/user-attachments/assets/4148779c-6217-429d-915d-a80f82f08fe1)

  

4. **Explore Page**  
   - View and explore all uploaded images.  
   - User-friendly interface for seamless navigation.
   - You can like any image and can see all likes.
  
  ![image](https://github.com/user-attachments/assets/55c04103-d03f-4731-8f92-695643576270)


## 🛠️ Tech Stack

- **Frontend**: React  
- **Backend**: Node.js  

## 📂 Project Structure



## Troubleshooting

1. Ensure MongoDB is running and the `MONGO_URI` is correct.
2. Verify that Cloudinary credentials are correct for image uploads.
3. Check for CORS errors if requests fail between frontend and backend.

## Author

**Krrish Khandelwal**

Feel free to contribute by opening issues and pull requests!

