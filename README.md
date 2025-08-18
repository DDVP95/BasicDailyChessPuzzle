# Daily Chess Puzzle App

![Java](https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white)  
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=springboot&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)  
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-blue)

Project Demo:  
[![Daily Chess Puzzle App Demo](https://img.youtube.com/vi/GOAGZ2NarDc/0.jpg)](https://youtu.be/GOAGZ2NarDc)

Overview  
The Daily Chess Puzzle App is a Spring Boot web application that lets users solve daily chess puzzles. It uses Google OAuth2 for login, MySQL for persistence, chess.js for move validation, and keeps secrets in a `.env` file.

Main features  
- Google OAuth2 authentication  
- MySQL persistence  
- Move validation with chess.js  
- Configuration via `.env`  
- Spring Security with password salting

Getting started

Prerequisites  
- Java 17  
- Maven  
- MySQL  
- Git

Clone the repository
~~~bash
git clone https://github.com/DDVP95/CA95.git
cd CA95
~~~

Create a `.env` file in the project root
~~~bash
touch .env
~~~

Example `.env` content
~~~env
##################################
# Database Configuration
##################################
DB_URL=jdbc:mysql://localhost:3306/cadb?useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

##################################
# JPA / Hibernate
##################################
JPA_HIBERNATE_DDL_AUTO=update
JPA_SHOW_SQL=true

##################################
# Server Configuration
##################################
SERVER_PORT=8080

##################################
# Security - Spring Boot Basic User
##################################
SECURITY_USER_NAME=admin
SECURITY_USER_PASSWORD=your_secure_password

##################################
# Logging
##################################
LOGGING_LEVEL_SPRING=INFO
LOGGING_LEVEL_CHESSAPP=DEBUG

##################################
# OAuth2 - Google
##################################
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google
GOOGLE_AUTHORIZATION_GRANT_TYPE=authorization_code
GOOGLE_SCOPE=openid,profile,email
GOOGLE_AUTHORIZATION_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_USER_INFO_URI=https://www.googleapis.com/oauth2/v3/userinfo
GOOGLE_USER_NAME_ATTRIBUTE=sub
~~~

Database setup  
Start MySQL and create the database.
~~~bash
mysql -u root -p
~~~
~~~sql
CREATE DATABASE cadb;
~~~

Run the application
~~~bash
mvn clean install
mvn spring-boot:run
~~~

The application will be available at  
http://localhost:8080

Login options  
- Sign in with Google OAuth2  
- Or use the basic user credentials from your `.env` file

Technologies used  
Java 17, Spring Boot 3, Spring Security (OAuth2), Hibernate & JPA, MySQL, Maven, chess.js, Bootstrap/TailwindCSS.

What I learned  
- Google OAuth2 with Spring Security  
- Managing secrets with environment variables  
- JPA/Hibernate with MySQL  
- Password salting and hashing  
- Structured logging and debugging  
- Integrating chess.js with a Spring Boot app

License  
This project is licensed under the MIT License (see LICENSE).

Future improvements  
- Leaderboard system  
- Puzzle difficulty levels  
- Improved UI and animations  
- User-submitted chess puzzles

Contact  
dominikvalledor2@gmail.com
