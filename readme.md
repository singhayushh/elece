# Readme

#### Welcome to Elece! 👋🏻

Elece is a web platform built for my college department to manage upcoming classes, assignments, schedules, activities and much more. 

I started Elece as a weekend project, built around simple APIs and a minimal UI (thanks to dribbble for inspirations) but I plan to extend it as a full fledged application for other colleges and schools with integrations for google classrooms and live meets.

Note that this isn't something of a class management system for university and college admins. Elece was made to be a private space for the students to somewhat manage their college lives and keep everything organized in this online era due to the pandemic.

----

#### Development log

Backend: NodeJS, Express, MongoDB

Frontend: HTML(EJS), CSS, JavaScript

Start Date: 04.06.2021

#### Installation guide

In case you want to explore the website, head over to [ELECE](http://elece.herokuapp.com).

Or, if you want to add any contributions and have a local copy, follow the steps below:
> Make sure you have node installed in your system.

1. Clone the repository into your system.
1. Open a terminal in the root project directory after cloning and hit `npm i` or `npm install`.
1. Create a file `.env` in the root directory of the project. This file is where we add all the environment variables.
1. Open `.env.example` file and copy all contents to `.env`. Here, you need to create and add your own Mongo uri for the db, Google client id and secret for Google Oauth, jwt secret and cookie name, as well as the server port and root url (which is to be the localhost). You can also use this uri - `mongodb+srv://dev:pass@arc.o6sl6.mongodb.net/devDB?retryWrites=true&w=majority`, created for development purposes.
1. The above steps were to setup the working environment. Whenever you wish to run the application, just type `npm start` in the root project directory and the website will be running the port mention in the `.env` file.

#### Usage and Licensing

Commercial usage is disallowed.
