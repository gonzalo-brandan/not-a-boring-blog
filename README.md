
<p align="center">
  <a href="https://github.com/not-a-boring-blog-frontend/vwc-site/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
  </a>
  <a href="https://github.com/not-a-boring-blog-frontend/vwc-site/blob/master/.github/contributing.md">
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square" alt="Contributions Welcome" />
  </a>
</p>

# Welcome to Not a Boring Blog :tada:

Hello, fellow bloggers! We're thrilled to introduce you to Not a Boring Blog. This platform is more than just a blog; it's a collaborative space where users sharpen their knowledge about their favourite topics, and our community can actively participate in CRUD operations (Create, Read, Update, Delete) to enhance their coding skills.  🚀

## What's Under The Hood 🧰

Frontend
- React.js
- Material UI
- JavaScript

*Frontend developed by Gonzalo Brandan*

Backend

- Python
- Django

*Backend developed by Alex Serban, Tetiana Hrybach, Dejan Brnda*

### Our Mission :dart:

1. **Empower Writers**: We offer a platform for users to share their stories, knowledge and perspectives about their favourites topics.
  
2. **Ever-Evolving Platform**: We continuously add features to keep our platform relevant and user-friendly.
  
3. **Learn By Doing**: We encourage our community to actively participate in CRUD operations (Create, Read, Update, Delete) to enhance their coding skills while contributing to our project's growth.

## Getting Started 🚀

To get a local copy up and running, you'll need a few things installed on your machine.

### Installation Steps :wrench:

Fire up your terminal and run:

```sh
$ git clone https://github.com/gonzalo-brandan/not-a-boring-blog-frontend.git
$ cd backend
```

Create, activate a virtual environment, and install requirements.txt
```sh
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```
Create a .env file with the following environmental variables:
> export SECRET_KEY='any-key'

And then source it with :
```sh
$ source .env
```


Run python3 manage.py migrate <b>if you use default database</b> to create the tables in the database, otherwise execute this step at the end. Run the server 
```sh
$ python3 manage.py migrate
```
Run the server
```sh
$ python3 manage.py runserver
```

## Adding Categories in Admin Console (Necessary if you want to create posts)

Create a Super user
```sh
$ python3 manage.py createsuperuser
```

To add categories in the admin console, follow these steps:

1. Navigate to the admin console by opening a web browser and visiting [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/).

2. Log in using superuser credentials.

3. Once logged in, go to the "Categorys" section.

4. Select "Add" to create a new category.

5. Choose a category name that reflects the topic for which you want to post. For example, you can name it "React."

6. Save the category.

7. You can create as many categories as needed, each representing a different topic for your posts.


Go back to the project. 

In a new terminal

Go to the frontend
```sh
$ cd ..
```

create a .env and add the following enviromental variable:
> REACT_APP_BACKEND_BASE_URL='http://127.0.0.1:8000/'


```sh
$ npm i react-scripts
$ npm run start
```

And boom! Navigate to `http://localhost:3000/` to see the app.

## Roadmap 🗺️

Curious about upcoming features? Check our [Milestone](https://github.com/gonzalo-brandan/not-a-boring-blog-frontend/milestones).

## License :scroll:

This project is under the MIT License.
