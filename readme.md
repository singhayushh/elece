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
1. Open `.env.example` file and copy all contents to `.env`. Here, you need to create and add your own Mongo uri for the db, Google client id and secret for Google Oauth, jwt secret and cookie name, as well as the server port and root url (which is to be the localhost). Detailed instructions for each of these can be found below.
1. The above steps were to setup the working environment. Whenever you wish to run the application, just type `npm start` in the root project directory and the website will be running the port mention in the `.env` file.

**Mongo URI**

- You can use my own development URI - `mongodb+srv://dev:pass@arc.o6sl6.mongodb.net/devDB?retryWrites=true&w=majority`
- If you want to create your own db instance and URI, here's [my gist on how to](https://gist.github.com/singhayushh/426f10353a8051593828e92c139ebdbc)

**Google Client ID and Secret**

Before creating Google Client ID and Secret, you need to have the root url and port specified.
Gist of the steps to be [followed](https://developers.google.com/adwords/api/docs/guides/authentication) are mentioned below:
- Open the [Google API Console Credentials](https://console.cloud.google.com/apis/credentials) page.
- From the project drop-down, select an existing project or create a new one.
- On the Credentials page, select Create credentials, then select OAuth client ID.
- Under Application type, choose Web application.
- Click Create. Copy the Client ID and Secret from the dialog box that appears after clicking on Create.
- The redirect URI should be set to `http://localhost:5000/auth/google` (replace 5000 with whatever port you mentioned in the .env file)

**JWT Secret**

You can put any random string that you want. It is like a private key that is used to secure JWT Tokens. Example value : `PASOFOj%$\_fkajjh?^ajchao`

**Cookie Name**

Name of the cookie that will be used to store the jwt token. Example value: `auth_token`

**ROOT_URL**

Set this to http://localhost unless you are deploying the application elsewhere.

**PORT**

Set to 5000 by default. If you need to change the port from 5000 to any other value, make sure you go to the Google Cloud Console and edit the redirect uri as well.

#### Usage and Licensing

Commercial usage is disallowed.
