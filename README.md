![favicon](https://github.com/user-attachments/assets/b3a5c907-a402-4c08-8889-8e3a3aa813a2)

# FavQuotes
**FavQuotes** is the back-end service for a web application where users can save and vote for their favorite quotes. The application allows users to manage quotes, organize them into groups, and interact with quotes through likes.


## 🔨 Features
- **User Management**: Create, read, update, and delete (CRUD) user accounts, with authentication to manage access securely.
- **Group Management**: CRUD operations for groups, allowing users to organize their favorite quotes.
- **Quote Management**: Manage quotes with CRUD operations, with the ability to like and unlike quotes.

## 💻 Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database for storing user, group, and quote data.
- **Postman**: Tool for API testing and development.
- **Netlify**: Platform for deploying the API.
- **JWT (JSON Web Tokens)**: For basic authentication of users.
- **Crypto.js**: For password encryption, using a SECRET_KEY for enhanced security.

## 🚀 Getting Started
Follow these steps to deploy the back-end service on Netlify:

### Prerequisites
- A Netlify account
- MongoDB Atlas account
- Postman (for testing API routes)

### Installation
1. Clone the repository:
   ```git clone https://github.com/yourusername/favquotes-backend.git```

2. Create a new site on Netlify from your GitHub repository.
3. Set the following environment variables in the Netlify dashboard under Site Settings > Build & Deploy > Environment:
   - MONGODB_URI="your-mongodb-atlas-uri"
   - JWT_SECRET="your-jwt-secret-key"
   - SECRET_KEY="your-secret-key-for-password-encryption"
4. Click Deploy Site to build and deploy your application.

## ☑️ Testing the API
You can test the available endpoints using Postman by importing the API collection or manually creating requests. View API documentation [here](https://documenter.getpostman.com/view/36703263/2sAXxS7rBj)
