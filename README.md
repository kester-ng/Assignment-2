# CS3219 Assignment B

## Assignment B1

### Description

A simple RESTFUL API to update and keep track of ingredients and how much it costs. It can also be food as well. Not really useful, but a simple demo for RESTFUL API with node.js, express and mongoDB. Used MongoDB Atlas to host online DB.

DO TAKE NOT THAT BOTH LOCAL AND HEROKU SHARE THE SAME ONLINE DATABASE. EASIER TO SET UP THAT WAY!

### Setting up Locally

1. Git clone the repository. Then at root folder, type `npm install` to install all the dependencies.

2. To start up the server, type in `npm run dev` at root of the project.

3. Then to access, go to `localhost:8080`

4. To access the RESTFUL api for the server, go to `localhost:8080/api/ingredients`. If you omit `/ingredients`, you will see a webpage with a happy message :).

5. Go Postman and try out the requests!

### To access the API on an endpoint (Heroku)

1. Just type in this link -> `https://contact-heroku.herokuapp.com/api/ingredients`.

2. The routes are the same, `https://contact-heroku.herokuapp.com/api` will direct you to a webpage with a happy message :).
 
### Data structure for database

Each ingredient contains 3 fields, all which are required. What the fields represent are self-explanatory They are:

1. Name: `String`

2. Price: `Float`

3. Stock: `Int`

4. _id: `Int`, this is auto-generated by Mongo Sequence Auto-increment. Can be ignored, here for your reference. `_id` is unique.

### Sample of POST, GET, UPDATE/PUT, DELETE (Using postman)

#### Get

##### GET Request

![Header](images/get_header.png)

##### GET Result

![Result](images/get_result.png)

#### Post

##### POST Request

![Header](images/post_header.png)

##### POST Result

![Result](images/post_result.png)

#### PUT/UPDATE

Required to update all fields!.

##### PUT Request

![Header](images/put_header.png)

##### PUT Result

![Result](images/put_result.png)

#### DELETE REQUEST

##### DELETE Request

![Header](images/delete_header.png)

##### DELETE RESULT

![Header](images/delete_result.png)


## Assignment B2

### Testing locally

1. Tests all `PUT`, `DELETE`, `POST`, and `GET` requests.

2. To run locally, simply type in `npm run test`

### Testing via travis CI

To be included....
