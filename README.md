# Bicycle-Store-Backend

## Features

- User authentication & authorization (JWT, OAuth, etc.)
- CRUD operations for resources (e.g., users, orders, products)
- Payment processing with SSLCommerz
- Secure API endpoints with middleware
- Admin role management


## Technologies
- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Integration**: SSLCommerz
- **Deployment**: Vercel

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Configuration
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Reyad02/bicycle-store-backend.git
   cd bicycle-store-backend
   ```

2. **Install Dependencies**
  ```bash
  npm install
   ```

3. **Set Up Environment Variables**
   ```env
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRED=10d
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret_key
   SSLCOMMERZ_STORE_ID=your_store_id
   SSLCOMMERZ_STORE_PASSWORD=your_store_password
   SSLCOMMERZ_SUCCESS_URL=https://your-site.com/api/order/payment-success
   SSLCOMMERZ_FAIL_URL=https://your-site.com/api/order/payment-fail
   SSLCOMMERZ_CANCEL_URL=https://your-site.com/api/order/payment-cancel
   SSLCOMMERZ_API_URL=https://sandbox.sslcommerz.com
  
4. **Start the Application**
   ```bash
   npm run dev  
   ```
