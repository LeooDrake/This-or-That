# What needs doing

## reset users and posts
~~- build js to reset users and posts to default if i stuff up~~

## voting
~~- make clicking a picture send to api~~
~~- make it add +1 to the vote~~

## sign up
~~- create a form to sign up (done)~~
~~- make a route for a sign up form~~
~~- make the api route (/api/signup) to process the signup~~
  ~~- set the cookie (log them in as well as sign up)~~
~~- HASH THE PASSWORD~~
~~- redirect to the home page~~

## log in
~~- create a login form (done)~~
~~- make a route for hte log in form~~
~~- make the api route (/api/login) to process the login~~
  ~~- set the cookie once again~~
~~- redirect to the home page~~

## log out
~~- just make an api route (/api/logout) that clears the cookie~~
  ~~- no form or anything required~~

## add post
~~- create an add post form (done)~~
- create hte api route to process the form
- add the dto the database
- redirect to the home page

## profile
- create a route that displays a table with all the users posts (determined by useriD?)
  - get all posts where ID = XXX
- add a delete button next to each post
- make the delete route as per below :P

## delete
- deletes whatever ID is passed to it as long as it matches the signed in user?


## leaderboard
~~- create a api route that pulls the top 20? ~~
~~- and displays in a table ~~
