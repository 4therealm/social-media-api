# Social Network API
## Description
* Homework #: 18  
* Due: 2/24/2023
* Repo: https://github.com/4therealm/social-media-api
* Demo: https://watch.screencastify.com/v/aSQbWggMF1lgIKdNBmf6

## User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API

* WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database

* WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON

* WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database

* WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation
```
npm i
```
## Operation
```
npm run start
```
## Seeding
```
npm run seed
```