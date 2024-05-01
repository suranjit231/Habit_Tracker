# HabitTracker

Our Habit Tracker Application is designed to simplify habit management and tracking on a daily basis. Users can effortlessly create, update, and delete habits according to their preferences, ensuring a personalized experience. Each user can track their habits individually, marking them as done or not done as they progress. Powered by Node.js for server-side scripting, Express for seamless HTTP request handling and routing, MongoDB for efficient data storage and management, and EJS for rendering views and templates, our application provides a user-centric approach to habit tracking and management

## Installation
To run this application on your local machine, please follow these steps:

Clone this repository using the following command:
```
$ git clone https://github.com/agentgrey/TodoList.git
```
Install the required dependencies using the following command:
```
$ npm install 
```
Start the application using the following command:
```
$ npm start 
```
Open the application in your web browser by visiting the following URL:
```
$ http://localhost:8000 
```

## Usage
Once you have the application up and running, you can start using it by following these steps:
* Sing-up/Sign-in into your account.
* Click on the "Add Habit" button to create a new habit.
* Enter the name of the habit you want to track.
* Click on the "Save" button to save the habit.
* To mark a habit as complete/incomplete for the day, simply click on the corresponding icon.
* To delete a habit, click on the "Delete" icon next to it.
* To see today's habits, click on "Show Daily" button.
* To edit a habit, click on the "Edit" icon next to it.

## Folder Structure
```
Habit Tracker
    |                           |--->weekly-habit.css
    |               |--->css--->|--->error.css
    |--->public---->|           |--->layout.css
    |               |--->form.js    
    |               |--->habitStatusControl.js
    |               
    |               |--->config---->|--->mongodbConfig.js
    |               |              
    |               |
    |               |--->controllers-->|-->habit.controller.js
    |               |
    |               |                  |-->user.controller.js
    |               |
    |               |               |-->habitSchema.js
    |               |--->models---->|-->otpSchema.js
    |               |               |-->userSchema.js
    |               |               
    |               |--->repository--->|-->habit.repository.js
    |               |                  |-->user.repository.js
    |               |               
    |               |
    |---> src ----> |               
    |               |--->routes---->|-->userRoutes.js
    |               |              
    |               |              |--->error.ejs
    |               |              |--->forgetPassword.ejs
    |               |              |--->home.ejs
    |               |              |--->laout.ejs
    |               |--->views---->|--->loginForm.ejs
    |               |              |--->showDaily.ejs
    |               |              |--->signup.ejs
    |               |              |--->weekly_view.ejs
    |               |              
    |
    |-->node_modules
    |-->.gitignore
    |--> server.js
    |--> package-lock.json
    |-->package.json
    
 ````


