# Daily Chess Puzzle App

![Java](https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white)  
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=springboot&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)  
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-blue)

---

Project Demo:  
[![Daily Chess Puzzle App Demo](https://img.youtube.com/vi/GOAGZ2NarDc/0.jpg)](https://youtu.be/GOAGZ2NarDc)

---

Overview  
The Daily Chess Puzzle App is a Spring Boot web application that allows users to solve daily chess puzzles.  

Main features:  
- Google OAuth2 Authentication  
- MySQL database for persistence  
- Chess validation with chess.js  
- Secure configurations via `.env`  
- Spring Security with password salting  

---

Getting Started  

Prerequisites (install locally):  
- Java 17  
- Maven  
- MySQL  
- Git  

Clone the repository:  
```bash
git clone https://github.com/DDVP95/CA95.git
cd CA95
Create a .env file in the root directory:

bash
Copy
Edit
touch .env
Example .env file:

env
Copy
Edit
DB_URL=jdbc:mysql://localhost:3306/cadb?useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

JPA_HIBERNATE_DDL_AUTO=update
JPA_SHOW_SQL=true

SERVER_PORT=8080

SECURITY_USER_NAME=admin
SECURITY_USER_PASSWORD=your_secure_password

LOGGING_LEVEL_SPRING=INFO
LOGGING_LEVEL_CHESSAPP=DEBUG

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google
GOOGLE_AUTHORIZATION_GRANT_TYPE=authorization_code
GOOGLE_SCOPE=openid,profile,email
GOOGLE_AUTHORIZATION_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_USER_INFO_URI=https://www.googleapis.com/oauth2/v3/userinfo
GOOGLE_USER_NAME_ATTRIBUTE=sub
Database setup

Start MySQL and create the database:

bash
Copy
Edit
mysql -u root -p
sql
Copy
Edit
CREATE DATABASE cadb;
Running the application

bash
Copy
Edit
mvn clean install
mvn spring-boot:run
The application will run at:
http://localhost:8080

Accessing the app

Open the URL in your browser and log in either with Google OAuth2 or with the basic user credentials from .env.
Once logged in, you can start solving the daily chess puzzles.

Technologies used

Java 17

Spring Boot 3

Spring Security (OAuth2)

Hibernate & JPA

MySQL

Maven

chess.js (move validation)

Bootstrap / TailwindCSS

What I learned

Google OAuth2 integration with Spring Security

Managing secrets with environment variables

Database integration with Hibernate and JPA

Password salting and hashing

Logging and debugging

Using chess.js in combination with a backend

License
This project is licensed under the MIT License – see the LICENSE file for details.

Future improvements

Leaderboard system

Puzzle difficulty levels

Better UI with animations

Allow users to submit their own chess puzzles

Contact
For questions or feedback: dominikvalledor2@gmail.com
