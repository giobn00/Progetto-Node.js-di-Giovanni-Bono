# Progetto-Node.js-di-Giovanni-Bono
APIRestfull 
<a name="readme-top"></a>

<!-- PROJECT HEAD -->

<br />

  <p align="center">
    An app that  allows you to manage a books library.
    <br />
    <a href="https://github.com/giobn00/Progetto-Node.js-di-Giovanni-Bono"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/giobn00/Progetto-Node.js-di-Giovanni-Bono/issues">Report Bug</a>
    ·
    <a href="https://github.com/giobn00/Progetto-Node.js-di-Giovanni-Bono/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
  # About The Project

This is a basic APIRestful written in JavaScript. It's a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **MongoDB** as database. I had tried to maintain the code structure easy. Project is open for suggestions, Bug reports and pull requests.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
  # Features

-   JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
-   Pre-defined response structures with proper status codes.
-   Included CORS.
-    **Order** | **Product**  | **User**  example with **CRUD** operations.
-   Validations added.
-   Included API collection for Postman.
-   Light-weight project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

To create this prject I use the following tools

* [![javascript][javascript.com]][javascript-url]
* ![HTML][HTML.com]
* ![gitignore][gitignore.com]
* ![NodeJS][NodeJS.org]
* ![MongoDB][MongoDB.org]
* ![Express][Express.org]  
* ![JWT][JWT.org]
* ![Postman][Postman.org]
*  <a href="https://mongoosejs.com/">Mongoose</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started
## Software Requirements

-   Node.js **8+**
-   MongoDB **3.6+** (Recommended **4+**)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/giobn00/Progetto-Node.js-di-Giovanni-Bono.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project  structure
```sh
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   ├── OrderController.js
│   ├── ProductController.js
│   └── UserController.js
├── models
│   ├── OrderModels.js
│   ├── ProductModels.js
│   └── UserModel.js
├── routes
│   ├── api.js
│   ├── index.js
│   ├── Order
│   ├── Product
│   └── User
├── middlewares
│   └── jwt.js
├── helpers
│   └── apiResponse.js
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to run

### Running API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```
**Note:**  `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[javascript-url]: https://javascript.com
[javascript.com]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[HTML.com]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[gitignore.com]: https://img.shields.io/badge/gitignore%20io-204ECF?style=for-the-badge&logo=gitignoredotio&logoColor=white
[NodeJS.org]: https://img.shields.io/badge/nodejs-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white
[ExpressJS.com]: https://img.shields.io/badge/Express.js-000000?
[MongoDB.org]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Express.org]:https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[JWT.org]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white
[Postman.org]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white
[Postman]: https://www.postman.com/
[Mongoose]: https://mongoosejs.com/
