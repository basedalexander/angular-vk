## Stack:

 * Persistence store: MongoDB
 * Backend: Node.js
 * AngularJS on the client
 * CSS based on Twitter's bootstrap

## Requirements:
* mongoDB installed and running.
* Nodejs >= 4.x.
* Grunt-cli installed globally.

## Installation

### Get the code 

```
git clone https://github.com/thohoh/angular-vk
cd angular-vk
```

### API server
Install local dependencies (from the project root folder):

```
cd api
npm install
cd ..
```

### Client
Install local dependencies (from the project root folder):

```
cd client
npm install
cd ..
```

## Run app

### API
```
cd api
node api.js
cd ..
```

### Client
```
cd client
grunt serve
cd ..
```