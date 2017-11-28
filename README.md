# HSBC Chatbot

This is the repo for the HSBC Chatbot for CPSC 319. It uses the following:
- Node.js for the server runtime
- MySQL as our database
- Sequelize as the ORM for Node.js to MySQL
- Nodeadmin for an interface for the MySQL

# Setup

* Make sure MySQL is installed on your system (e.g. for mac `brew update && brew install mysql`) and running (e.g. `brew services start mysql`).

* Create a dev admin user to use locally with username 'root' and password 'password'

* `mysql -u root -p < schema.sql` to set up your local MySQL with the "hsbc_api" database schema.

* You'll need to update `config.json` so that the project is pointing at
the relevant MySQL database with the correct credentials.

`npm install && npm start`

* the ngrok lets you run your server on https instead of http/localhost

* you need to `sudo cp ngrok /usr/local/bin` in order to use `ngrok http 5000` command

# Run the server

* `node index.js`
* `ngrok http -subdomain=teamhortons 3000`

There is also a Web interface to the MySQL database; you can reach it at
[http://127.0.0.1:8000/nodeadmin](http://127.0.0.1:8000/nodeadmin).
