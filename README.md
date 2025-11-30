#This is a project for CS 480

You will notice that there are 3 different folders for the project: (all in alphabetical order)
- backend
- database
- frontend

With backend, there are different API calls to be made, so those are separated in scripts:
- db.js -> Gets the LOCAL database
- index.js -> Defines different routes / scripts used
- /routes/... -> Each stores a get / post HTTP request
    - Though we do not use the POSt HTTP request, it is included just in case...

To set up the backend, I did the following:
- cd backend
- npm install
- npm run dev

With the database, it well, ... stores the SQL query for creating the tables in the bookoverflow database. Honestly, there is not too much to say about it.

But, if you want to set up your database, I can't really say too much about it. I am using MySQLWorkbench to run my queries to create my database, tables, and schemas. If you want the actualt database file, then you can export it from ... I forgot. :|

For the front end, this is where the UI / UX can shine!
I chose React because it allows us to create instances od reusable elements, which can prove to be useful in the future: creating a nav elements for MANY pages, creating a card element that is used mutiple times in ONE page, etc.
The main.jsx is the "main" page that stores the "main" element in the HTML page, whereas app.jsx is the "skeleton" of the "main" element in the "main" page
P.S.the stylesheets were created on their own (NOT by ChatGPT)!

To set up the backend, I did the following:
- cd frontend
- npm install
- npm run dev
So, similar to how you setup the backend. Okay, take care! :)

📘 Database Setup (VS Code + MySQL Extension) Use this section to set up the database for this project.

This project uses a shared MySQL database dump so everyone on the team has the same dataset without needing to run the Python script.

Follow the steps below.

Install the MySQL extension in VS Code
STEP 1 – Create the database and project user
Use either:

MySQL Workbench,

OR VS Code MySQL extension (new query),

OR terminal:

Open a SQL editor and run this SQL:
-- Create the database
CREATE DATABASE cs480_group_project;

-- Create a low-stakes project user
CREATE USER 'cs480'@'localhost' IDENTIFIED BY 'cs480pass';

-- Give it access only to this database
GRANT ALL PRIVILEGES ON cs480_group_project.* TO 'cs480'@'localhost';
FLUSH PRIVILEGES;

Now MySQL is ready with:

DB name: cs480_group_project

User: cs480

Password: cs480pass

You’ll only ever use that in your project code, not your root password.

Open the file full_database.sql in VS Code. It is under the Database folder

Click "Run" (▶️) or right-click → "Run MySQL Query".

This loads the entire dataset (Books, Authors, Genres). Customers and Ratings tables will be empty by default.
