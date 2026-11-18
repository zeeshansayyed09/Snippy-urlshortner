# 🔗 Snippy – URL Shortener

**Snippy** is a web-based URL shortener that transforms long URLs into short, shareable links. It provides user authentication, personalized URL management, and QR code generation, making link sharing simple and convenient.

🌐 **Live Demo:** [https://snippy-ip1d.onrender.com/](https://snippy-ip1d.onrender.com/)

## ✨ Features

- 🔗 **URL Shortening** – Convert long URLs into short, unique links.
- 🔐 **Google Authentication** – Sign in and sign up using Google.
- 🛡️ **Secure Authentication** – JWT-based authentication and password hashing.
- 👤 **Personal Dashboard** – Manage your shortened URLs in one place.
- 📊 **URL Management** – View and manage your created short links.
- 📱 **QR Code Generation** – Generate QR codes for shortened URLs.
- 🔄 **URL Redirection** – Redirect users to their original destination.
- 🔒 **Protected Routes** – Restrict access to authenticated users.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| EJS | Server-side rendering |
| JavaScript | Application logic |
| Passport.js | Google authentication |
| JWT | Authentication |
| bcryptjs | Password hashing |
| NanoID | Short URL generation |
| QRCode | QR code generation |
| CSS | Styling |

## 📸 Screenshots

<!-- Add your project screenshots here -->

## 📂 Project Structure

```text
Snippy-urlshortner/
│
├── controller/       # Application controllers
├── middleware/       # Authentication middleware
├── models/           # MongoDB models
├── public/           # Static assets
├── routes/           # Application routes
├── services/         # Authentication services
├── views/            # EJS templates
│
├── connectDb.js      # Database connection
├── index.js          # Application entry point
├── package.json
└── .gitignore
```

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/zeeshansayyed09/Snippy-urlshortner.git
```

**2. Navigate to the project**

```bash
cd Snippy-urlshortner
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory.

```env
PORT=5678
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Configure your Google OAuth credentials and any additional environment variables required by your authentication services.

**5. Start the application**

```bash
npm start
```

Open your browser at:

```text
http://localhost:5678
```

## 🔐 Authentication & Security

Snippy implements authentication using Passport.js with Google OAuth 2.0 and JWT-based authentication.

- Google sign-in integration.
- Password hashing using bcryptjs.
- Cookie-based authentication.
- Protected routes using custom middleware.
- User-specific URL management.

## 🎯 What I Learned

- Building a complete URL shortener application.
- Implementing Google authentication using Passport.js.
- Working with JWT and cookie-based authentication.
- Designing RESTful routes and backend architecture.
- Managing user-specific data with MongoDB and Mongoose.
- Generating unique short URLs.
- Integrating QR code generation.
- Organizing an Express application using controllers, routes, middleware, and services.

## 🚀 Future Improvements

- URL click analytics and tracking.
- Custom short URL aliases.
- Link expiration functionality.
- Advanced dashboard analytics.
- Improved UI and user experience.

## 👨‍💻 Author

**Zeeshan Sayyed**

- GitHub: [@zeeshansayyed09](https://github.com/zeeshansayyed09)

---

⭐ If you like this project, consider giving it a star!
