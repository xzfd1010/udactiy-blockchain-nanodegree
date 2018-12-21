# Project #2. Private Blockchain

This is Project 2, Private Blockchain, in this project I created the classes to manage my private blockchain, to be able to persist my blochchain I used LevelDB.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Testing the project
1. get block test: use postman to send "localhost:8000/block/:index"
2. post block test: use postman to send "localhost:8000/block" with the request body {content:'something}
