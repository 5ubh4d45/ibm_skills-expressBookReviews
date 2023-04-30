# **Final Assignment for IBM Backend app with Express.js module**

This is the final assignment for the IBM Backend app with Express.js module. The assignment is to create a REST API for a book shop application. The API should be able to perform CRUD operations on books and reviews.
</br> </br>
The API should also be able to perform authentication and authorization. It is done using **JWT** tokens and **express-session** middleware. The API should also be able to perform logging using a basic middleware I wrote.

<br>

# **API Endpoints**


## **Authentication Endpoints**
- **"/register"** - POST - Register a new customer/user. The request *JSON* body should contain the following fields:
    - username
    - password

- **"/login"** - POST - Login a customer/user. User needs to be registered first to ensure logging in. The request *JSON* body should contain the following fields:
    - username
    - password

## **Public Endpoints**
- **"/"** - GET - Get all books

- **"/isbn/:isbn"** - GET - Get a book by ISBN

- **"/author/:author"** - GET - Get books by author

- **"/title/:title"** - GET - Get books by title

- **"/review/:isbn"** - GET - Get reviews for a book by ISBN

## **Protected Endpoints**
***PROTECTED_BASE_URL***: **"/customer/auth/*"**

- **"/review/:isbn?review={review text}"** - PUT - Add or Edit review for a book by ISBN by the current logged in customer/user. The review data shoud be sent through the query parameters as follows:
    - review
    
- **"/review/:isbn"** - DELETE - Delete review for a book by ISBN by the current logged in customer/user
