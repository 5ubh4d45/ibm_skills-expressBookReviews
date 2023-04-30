const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const SECREC_KEY = "Secrect_Access_Key";

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
 let filtered = users.filter((user)=>user.username === username);
  if(filtered.length > 0){
    return false;
  }else{
    return true;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let filtered = users.filter((user)=>user.username === username && user.password === password);
  if(filtered.length > 0){
    return true;
  }else{
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  if (username && password) {
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({data: username}, SECREC_KEY, {expiresIn: 60 * 60});
      req.session.authorization = {username, accessToken};
      return res.status(200).json({message: "Login successful"});
    }
    return res.status(401).json({message: "Unauthorized Access"});
  }  
  return res.status(400).json({message: "Username or Password is missing"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.session.authorization.username;
  const isbn = req.params.isbn;
  const reviewText = req.query.review;
  const now = new Date();
  const dateTimeString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const review = {"review": reviewText, "dateModified": dateTimeString};

  book = books[isbn];
  if (book) {
    book.reviews[user] = review;
    return res.status(200).json({message: "Review added successfully"});
  }

  // return content not found
  return res.status(404).json({message: "Book with ISBN: "+ isbn +" Not Found!"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.session.authorization.username;
  const isbn = req.params.isbn;
  book = books[isbn];
  if (book) {
    if (book.reviews[user]) {
      delete book.reviews[user];
      return res.status(200).json({message: "Review deleted successfully"});
    }
    return res.status(404).json({message: "Review not found"});
  }
  // return content not found
  return res.status(404).json({message: "Book with ISBN: "+ isbn +" Not Found!"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.SECREC_KEY = SECREC_KEY;
