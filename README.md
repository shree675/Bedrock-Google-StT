# Bedrock Google Speech to Text
Internship Project, Phase 3

## About
Bedrock Google StT is a web application that lets users upload audio files, transcribe them using Google Speech to Text API and generate a video from the transcript. Equipped with authentication, PostgreSQL database and stripe payments, this is a standard SaaS application.  
This application uses [Bedrock](https://bedrock.mxstbr.com/) boilerplate created by Max Stoiber.

## Features
* The app provides a Twitter login option for the users to login and to be able to upload audio files for conversion into videos.  
  
  <img src="github-assets/Screenshot (343).png" width="600" />
  
* Once successfully logged in, the user can head over to the profile section and edit username and email or add a profile picture.  
  
  <img src="github-assets/Screenshot (342).png" width="600" />
  
* Currently, *.mp3*, *.wav* and *.flac* audio file formats are supported. Once the audio file is uploaded, a prompt regarding the language of the audio file content will appear and the user must choose one. There are 20 supported languages available.
  
  <img src="github-assets/Screenshot (341).png" width="600" />
  
* Once the transcript is available, the app requests the user to fill details such as the title, subtitle, colors and images. All these details along with the transcript are stored in a PostgreSQL database hosted on heroku and are matched to the particular user.  

  <img src="github-assets/Screenshot (345).png" width="600" />
  
* A video will then be generated by analysing the transcript using ML which the user can download.

## Tools and Frameworks
* Next.js for frontend and backend
* Node.js for passport authentication
* Docker to run PostgreSQL database locally
* Prisma and GraphQL for querying the database
* TailwindUI for UI/UX design
* Stripe for payments and subscriptions
* Google Speech to Text API for transcription

## Screenshots
Check out [github-assets](github-assets).

## Local Dev Environment
*(Currently Archived)*
1. Navigate to the root directory of this project.
2. Open up a terminal and run these commands in sequence: 
 
   ```sh
   $ yarn
   $ yarn prisma:migrate
   $ yarn dev
   ```
3. In a second terminal, run docker:  

   ```sh
   $ docker-compose up
   ```
4. Open up a third terminal and run:
   
   ```sh
   $ nodemon server
   ```
5. Finally, open [localhost:3000](http://localhost:3000/) in your browser to view the web app.
