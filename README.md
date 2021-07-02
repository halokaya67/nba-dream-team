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
- Favorite team


## Routes:
- GET / 
    - Renders the homepage

- GET /auth/signup 
    - Renders the signup form
    
- POST /auth/signup
    - Renders signup form with en error if user login fails
    - Redirects to /profile if user logs in
    - body:
        - username
        - email
        - password

- GET /auth/login
    - Renders the login form

- POST /auth/login
    - Redirects to /profile if user logs in 
    - Renders login form with an error if user login fails
    - body:
        - username
        - password

- POST /auth/logout
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
        - favouriteTeam
        - aboutMe

- GET /profile/myteam/edit
    - Renders my team edit form

- POST /profile/myteam/edit
    - Redirects to /profile/myteam/edit page if it's successful
    - Renders my team edit form with an error if user fails

## Models

User model
```
username: String
email: String
password: String
```

Profile model
```
imageUrl: String
username: String
email: String
password: String
age: Number
country: String
favouriteTeam: Array
favouritePlayers: Array
aboutMe: String
```

## Links

### Trello
Trello Link

### Git
https://github.com/halokaya67/nba-dream-team
Deploy Link

### Slides
Slides Link