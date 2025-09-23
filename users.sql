DROP DATABASE IF EXISTS labActivity;

CREATE DATABASE IF NOT EXISTS labActivity;
USE labActivity;

CREATE TABLE IF NOT EXISTS users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender ENUM('Male','Female') NOT NULL,
  hobbies VARCHAR(255),
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW IF NOT EXISTS user_view AS 
  SELECT id, fullname, email, username, gender, hobbies, country
FROM users;