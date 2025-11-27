#This is a project for CS 480

📘 Database Setup (VS Code + MySQL Extension)
Use this section to set up the database for this project.

This project uses a shared MySQL database dump so everyone on the team has the same dataset without needing to run the Python script.

You only need to import the file:

full_database.sql

Follow the steps below.

Install the MySQL extension in VS Code

Add a MySQL connection:

Server: 127.0.0.1
User: cs480
Password: cs480pass
Create the database: CREATE DATABASE cs480_group_project; USE cs480_group_project;

Open the file full_database.sql in VS Code. It is under the Database folder

Click "Run" (▶️) or right-click → "Run MySQL Query".

This loads the entire dataset (Books, Authors, Genres). Customers and Ratings tables will be empty by default.
