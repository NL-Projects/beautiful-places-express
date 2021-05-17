# Beautiful Places Express
***
## _Showcase your favorite locations!_

- Upload and present your favorite locations on the planet!

## Features

- currently is a REST API with full CRUD operations

## Tech

Beautiful Places Express uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [MongoDB] - a source-available cross-platform document-oriented database program;
- [Mongoose] - elegant mongodb object modeling for node.js
- [dill] - markdown creator tool (.MD file)
- [Rest-client] - easy to use API testing like postman, the file is called route.rest

***

## Installation

Beautiful Places Express requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/NL-Projects/beautiful-places-express.git
cd beautiful-places-express/server
npm i
```
then run  the following commands:
```
echo DATABASE_URL=mongodb://localhost/locations > .env
```

## running the server

```sh
npm run devStart
```

   [dill]: <https://github.com/joemccann/dillinger>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [MongoDB]: <https://www.mongodb.com/>
   [Mongoose]: <https://mongoosejs.com/>
   [Rest-client]: <https://marketplace.visualstudio.com/items?itemName=humao.rest-client>
