# Build a Course Rating API With Express 
>Treehouse Techdegree Project #11

The API will provide a way for users to review educational courses: users can see a list of courses in a database; add courses to the database; and add reviews for a specific course.

### Required Skills: Node.js, Express, Mongoose, MongoDB

## How to run the project
### Setup the application 
Open a Command Prompt (on Windows) or Terminal (on Mac OS X and Linux) instance and browse to the root project folder.
```
$ git clone https://github.com/seanmyung/build-rest-api-with-express.git
$ cd build-rest-api-with-express
```
### Install the application
Run the command `npm install` to install the required dependencies.
```
$ npm install 
```
### Run the MongoDB
Run the command `mongod` to run the Database.
```
mongod
```
### Run the application
Open the another terminal and run the command `npm start` to run the Node.js application.
```
npm start
```
### View the application 
It navigate to`http://localhost:5000/`.
To test your application, open your Postman which is a greate Chrome App that use to explore and test REST APIs. 

### Stop the program 
You can press `Ctrl-C` to stop the Node.js application in the terminal.

### Connecting Routes available 
You can search for more information I created about "courses" and "users" through the following routes. 
* `/api/users/` GET - Returns the current user
* `/api/users`  POST - Creates a user
* `/api/courses`  GET - Returns a list of courses
* `/api/courses`  POST - Creates a course
* `/api/courses/:id`  GET - Returns a single course
* `/api/courses/:id`  PUT - Updates a course 
* `/api/courses/:courseId/reviews`  POST - Creates a review for the specified course

