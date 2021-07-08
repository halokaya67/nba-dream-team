# NBA Dream Team

## Description 

The NBA Dream Team app will allow users to create a profile. In their profile, they will be able to create custom teams and define their favorite players.

## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **landing page** - As a user I want to see a sign in and sign up feature so that I can access my profile

- **sign up** - As a user I want to sign up with an email, username, and password

- **sign in** - As a user I want to be able to input my credentials (username and password) and be redirected to my profile

- **profile** - As a user I want to be able to submit profile picture, and miscellaneous information about my username
                Here, I want to search for players and add them to one of my teams. I want my teams and favorite players to be featured here as well.  


## Backlog

Add a competition mode where teams can compete against each other.

## User profile:

- See my profile
- Upload my profile picture
- Update my personal info
- Select players
- Add players to team
- Favorite players
- View team
- Edit team

## Routes:
- GET / 
    - Renders the homepage

- GET /signup 
    - Renders the signup form
    
- POST /signup
    - Renders signup form with en error if user login fails
    - Redirects to /profile if user logs in
    - body:
        - username
        - email
        - password

- GET /login
    - Renders the login form

- POST /login
    - Redirects to /profile if user logs in 
    - Renders login form with an error if user login fails
    - body:
        - username
        - password

- GET /logout
    - Redirects to / after logout

- GET /profile
    - Renders profile page

- GET /profile/edit
    - Renders profile edit form

- POST /profile/edit
    - Redirects to /profile page if it's successful
    - Renders profile edit form with an error if user fails
    - body:
        - imageUrl
        - username
        - email
        - password
        - age
        - country
        - favTeam
        - aboutMe

- POST /profile/delete
    - Deletes the user profile
    - Redirects user to / if it's successful
    - Renders profile edit form with an error if user fails

- POST /upload
    - Sets the user profile pic
    - Redirects user to /profile if it's successful
    - Renders profile edit form with an error if user fails

- GET /profile/create-team
    - Renders the create team form

- POST /profile/create-team
    - Creates a team and pushes it into user model
    - Redirects to /profile if it's successful
    - Renders create team form with an error if the user fails

- POST /profile/:id/delete-team
    - Deletes the team and every connected element
    - Redirects to /profile if it's successful
    - Renders profile page with an error if user fails

- GET /profile/:id
    - Renders team page if it's successful
    - Redirects to /profile with an error if user fails

- GET /profile/:id/edit-team
    - Renders edit team form if it's successful
    - Redirects to /profile with an error if user fails

- POST /profile/:id/edit-team
    - Updates the team element info
    - Redirects to /profile if it's successful
    - Redirects to /profile with an error if user fails

- POST /upload/:id/team-logo
    - Sets the team logo
    - Redirects user to /profile if it's successful
    - Renders edit team form with an error if user fails

## Models

User model
```
username: String
email: String
password: String
```

Player model
```
first_name: String
last_name: String
team_name: String
height_feet: Number
height_inches: Number
weight_pounds: Number
position: String
```

Team model
```
name: String
imageUrl: String
players: {
    ref: 'Player'
    type: ObjectId
}
```
## Links

### Trello
https://trello.com/b/Xy8aIqsc/nba-dream-team

### Git
https://github.com/halokaya67/nba-dream-team
Deploy Link

### Slides
https://docs.google.com/presentation/d/1Umk8ae6Evt-DWLYJeJhL20IP9RNI0NdIR0EK-Cu4YUk/edit?usp=sharing