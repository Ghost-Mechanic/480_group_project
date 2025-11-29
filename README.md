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