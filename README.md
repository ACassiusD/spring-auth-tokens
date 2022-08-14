# spring-auth-tokens
A spring project with a basic CRUD endpoints for managing a asset table. Includes JWT token authorization. Leverages Spring security package.

#### DOWNLOAD POSTMAN ENVIROMENT HERE ####
[Asset application.postman_collection.zip](https://github.com/ACassiusD/spring-auth-tokens/files/9332452/Asset.application.postman_collection.zip)

#### HOW TO RUN REACT FRONTEND ####

  -CD into src/main/frontend
  
  -Run npm start.
  
  -http://localhost:3000/ should be default to login page.
  
  -http://localhost:3000/assets is restricted to only those with a auth token.
  
  -CRUD calls within /assets will fails and return an authentication error message if auth token is not valid.