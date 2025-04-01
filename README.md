# LMS - Library Management System

This project is a Library Management System (LMS) with a Spring Boot backend and a React frontend.

## Project Structure

```
LMS/
├── backend(Java)/      # Spring Boot application
│   ├── pom.xml   # Maven configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── src/      # Source code
├── frontend(TypeScript)/     # React application
│   ├── package.json # NPM configuration
│   ├── vite.config.ts # Vite configuration
│   └── src/      # Source code
└── README.md
```

## Features

- **User Authentication:** Secure login, registration, OTP verification, and password reset functionality.
- **Role-Based Access Control:** Distinct dashboards and capabilities for regular users and administrators.
- **Book Catalog:** Browse and search available books in the library.
- **Book Management (Admin):** Add new books, view book details (potentially edit/delete - inferred).
- **Borrowing System:** Users can borrow books, view their currently borrowed books, and return them. Admins can manage borrowing records.
- **User Management (Admin):** View and manage registered users.
- **Email Notifications:** Automated emails for actions like registration, password reset, and potentially borrowing reminders (inferred from `EmailService` and `SchedulerService`).
- **Profile Settings:** Users can manage their profile information (inferred from `SettingPopup`).
- **Cloudinary Integration:** Handles image uploads

## Technologies Used

This project utilizes a modern technology stack chosen for robustness, scalability, and developer experience. The backend is built with Java and the Spring Boot framework, leveraging MongoDB for data persistence and Spring Security for authentication. The frontend is a dynamic single-page application powered by React and TypeScript, styled with Tailwind CSS, and managed using Vite for an efficient development workflow.

**Backend:**

- Java 21
- Spring Boot 3.4.3
- Maven
- Spring Data MongoDB
- Spring Security
- Spring Web
- Java Mail Sender
- JJwt (JSON Web Token)
- Cloudinary
- Docker

**Frontend:**

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Chart.js
- Material UI (@mui/material)
- Lucide React Icons
- React Icons
- React Toastify
