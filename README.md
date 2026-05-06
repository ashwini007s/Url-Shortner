# MERN Stack URL Shortener 🔗

A full-stack web application designed to convert long, messy URLs into clean, easily shareable short links. Built with the MERN stack (MongoDB, Express, React, Node.js), this application features a sleek, glassmorphic UI and includes built-in click tracking.

## ✨ Features
- **Instant URL Shortening**: Paste any valid URL and instantly receive a short link.
- **Direct Redirection**: Clicking the short link seamlessly redirects users to the original destination.
- **Click Tracking Analytics**: The backend automatically counts how many times a link has been visited.
- **Modern Glassmorphism UI**: Beautiful, responsive user interface with dynamic background animations and inline copy feedback.
- **1-Click Copy**: Easily copy the generated URL to your clipboard.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Plain CSS (Custom Glassmorphism Design)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Utilities**: `nanoid` (for unique ID generation), `valid-url` (for link validation)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas URI)

### Installation

1. Navigate to the project root directory:
   ```bash
   cd url_shortner
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/url_shortener
   BASE_URL=http://localhost:5000
   ```

3. **Frontend Setup**:
   Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

To run the application locally, you will need two terminals running simultaneously.

**Terminal 1 (Backend Server)**:
```bash
cd backend
npm run dev
```
*(The backend runs on `http://localhost:5000`)*

**Terminal 2 (Frontend Client)**:
```bash
cd frontend
npm run dev
```
*(The frontend usually runs on `http://localhost:5173`)*

## 🛣️ API Endpoints

- `POST /api/url/shorten`: Accepts `{ "originalUrl": "..." }` and returns the shortened URL object.
- `GET /:urlId`: Takes the short code, increments the click counter, and redirects to the original URL.
