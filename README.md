# **Battleship Proposal**

# Overview

The Battleship website will be a web application in which users can play the game Battleship on their selected web browsers. They will be given the option to register an account with the website to keep track of game scores and even compete with other players on a shared leaderboard. The main gaming mode will be Player vs Player in Battleship, where two players take turns trying to sink their opponent&#39;s ships based on a grid system. The Battleship will be 3D based, in which each player is given two grids (one for the sea, one for the airspace) and are tasked with destroying their opponent&#39;s ships and planes. The first player who destroys their opponent&#39;s army wins.

# Tables

User table:
  - Username (possibly as email)
  - Password
  - IsAdmin for our team to run the site
  - Email, to notify leaderboard scorers of their failures
  - Register date

Scores table:
  - User Id
  - Score
  - Game date

User Statistics table:
  - userId
  - Wins
  - Losses
  - Ties

# User Stories (MVPs)
1. As a user, I should be able to register for an account.
2. As a user, I should be able to successfully sign in.
3. As a user, I should be able to play Battleship.
4. As a user, I should be able to be matched with another player to play the game.
5. As a user, I should be able to communicate with my opponent in the in-game chat.
6. As a user, I should be able to view the community score leaderboard.
7. As a user, I should be able to view my profile on the website.
8. As a user, I should be able to view my game statistics on my profile.
9. As an admin, I should be able to view all users.
10. As an admin, I should be able to modify user accounts when deemed &quot;necessary&quot;.

ERD:

 ![ER Diagram](https://cdn.discordapp.com/attachments/667131265773731903/870729388939968512/unknown.png)
 
 # Scope Goals (Post-MVP)
1. Players can create and compete in lobbies.
2. As a user, I should be able to receive emails when I lose the leaderboard top score.
3. Allows users to play a single-player mode against a simple bot.
4. Add ship movement to the game mechanics.
5. Add additional game mechanics based on user/admin demand.

# Tech Stack
- AngularJS
- .NET 5.0
- PostGreSQL
- Azure DevOps
- Github
- Github Actions
- SonarCloud
- Moq, Sqlite, Xunit
- Serilog
- Socket.io