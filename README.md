# React + Vite CRUD Application with Firebase

This project demonstrates a CRUD (Create, Read, Update, Delete) application built using **React** and **Vite** with **Firebase** as the backend.

## Features
- **Add Data**: Create new entries in the Firebase database.
- **Read Data**: Fetch and display data from Firebase in real-time.
- **Update Data**: Edit existing entries and update them in Firebase.
- **Delete Data**: Remove unwanted entries from Firebase.

## Technologies Used
- **React**: Frontend framework for building the user interface.
- **Vite**: Fast and optimized build tool for modern web development.
- **Firebase**: Backend as a service for real-time database and hosting.
- 
## 📸 Screenshot
![Screenshot](https://github.com/Himanshu1529/React-Curd-Opreation/blob/main/Screenshot%202025-01-22%20215829.png) 

## Installation and Setup

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Himanshu1529/React-Curd-Opreation.git
   cd React-Curd-Opreation
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable the Firebase Realtime Database or Firestore.
   - Generate Firebase configuration and replace it in your project.
   - Update `firebaseConfig` in the `src/config/firebase.js` file:
     ```javascript
     const firebaseConfig = {
       apiKey: "<API_KEY>",
       authDomain: "<PROJECT_ID>.firebaseapp.com",
       databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
       projectId: "<PROJECT_ID>",
       storageBucket: "<BUCKET>.appspot.com",
       messagingSenderId: "<SENDER_ID>",
       appId: "<APP_ID>"
     };
     ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:5173` in your web browser.

## Project Structure
```
.
├── src
│   ├── components      # Reusable React components
│   ├── config/firebase.js     # Firebase configuration and initialization
│   ├── App.jsx         # Main application component
│   └── index.jsx       # Application entry point
├── public              # Static assets
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.

## Deployment

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   - Install Firebase CLI:
     ```bash
     npm install -g firebase-tools
     ```
   - Login to Firebase:
     ```bash
     firebase login
     ```
   - Initialize Firebase Hosting in your project:
     ```bash
     firebase init
     ```
   - Deploy:
     ```bash
     firebase deploy
     ```

## License
This project is licensed under the MIT License.

## Author
**Himanshu Sharma**  
[GitHub Profile](https://github.com/Himanshu1529)

---

Enjoy building and exploring the CRUD application!

