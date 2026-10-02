npm install express mongoose cors dotenv
npm init -y
install nodemon as a development dependency: npm install --save-dev nodemon 

And the TypeScript/development packages: npm install -D typescript tsx @types/node @types/express @types/cors

Package    Purpose

express.   Creates our backend/API server

mongoose   Connects Node to MongoDB and defines models

cors.      Allows our mobile app to communicate with the backend

dotenv.    Loads secrets/configuration from .env

nodemon.   Automatically restarts the server when code changes


express       → backend framework
mongoose      → MongoDB interaction
cors          → allows frontend → backend requests
dotenv        → reads .env variables

typescript    → TypeScript compiler
tsx           → runs TypeScript during development
@types/node   → Node.js type definitions
@types/express→ Express type definitions
@types/cors   → CORS type definitions