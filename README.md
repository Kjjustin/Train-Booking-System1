# 🚆 Train Ticket Reservation System

A full-stack web application developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that enables users to search for trains, book tickets, and manage reservations seamlessly. The application features user authentication, real-time data handling, and cloud database integration using MongoDB Atlas.

---

## 📌 Features

- **User Authentication**: Secure registration and login functionalities.
- **Train Search**: Search trains based on source and destination.
- **Ticket Booking**: Book tickets by providing passenger details and selecting seats.
- **Reservation Management**: View and cancel existing bookings.
- **Admin Panel**: Manage train schedules and monitor bookings.
- **Responsive Design**: Ensures optimal viewing experience across devices.
- **Cloud Integration**: Utilizes MongoDB Atlas for database hosting.

---

## 🛠️ Tech Stack

**Frontend**:
- HTML
- CSS
- JavaScript
- React.js

**Backend**:
- Node.js
- Express.js

**Database**:
- MongoDB (Hosted on MongoDB Atlas)

**Tools & Services**:
- Visual Studio Code
- Git & GitHub
- Postman
- MongoDB Compass
- Render (for backend deployment)

---

## 📂 Project Structure

```

/client             -> React frontend
/server             -> Express backend
/server/models      -> MongoDB schemas
/server/routes      -> API endpoints
/public             -> Static assets

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kjjustin/Train-Booking-System1.git
   cd Train-Booking-System1

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `/server` directory with the following content:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
- Use `mongodb://127.0.0.1:27017/trainDB` to connect locally via MongoDB Compass.  
- Use `mongodb+srv://k_j_justin:12345@cluster0.kx0aczh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` for live deployment via MongoDB Atlas.

5. **Run the application**

   * Start the backend server:

     ```bash
     cd server
     npm start
     ```

   * Start the frontend application:

     ```bash
     cd client
     npm start
     ```

   Access the application at `http://localhost:3000`.

---

## 🧪 API Testing

Utilize **Postman** or a similar API testing tool to test the following endpoints:

* `POST /register` – Register a new user
* `POST /login` – Authenticate a user
* `GET /trains` – Retrieve available trains
* `POST /book` – Book a train ticket
* `DELETE /cancel/:id` – Cancel a booking
* `GET /bookings` – View user's bookings

Ensure the backend server is running before testing these endpoints.

---

## 🌐 Future Enhancements

* **Payment Integration**: Incorporate a secure payment gateway for ticket purchases.
* **Real-time Updates**: Implement real-time train tracking and status updates.
* **Mobile Application**: Develop a mobile version using React Native.
* **AI Chatbot**: Integrate a chatbot for user assistance and support.
* **Multi-language Support**: Provide support for multiple languages to cater to a diverse user base.

---

##  Author

**K J Justin**
GitHub: [@Kjjustin](https://github.com/Kjjustin)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


