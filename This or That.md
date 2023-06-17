
## Overview

This or That - the ultimate competition! 

A single page application where the user is presented with two randomised, user submitted images, and has to vote on the one that they prefer.

Users will register for an account, and then have the ability to upload submissions consisting of a single image and a title. Users will also have access to a leaderboard where they can see the culminative total of all votes against submissions, as well as their own submissions with votes next to them.

The app itself will be written in [[expressJS]] using [[MongoDB]] as the database, and possibly [[Bootstrap]] for front end styling. 



# FRONT END

## Templates

- Main.html - basic HTML template for entire site.
	- If a user is authenticated and logged in, the header of the page will display a link for About, Your Submissions, Leaderboard, and Log Out.
	- If user is not logged in, the header will display About, Leaderboard, and Signup/Signin.
	- Has a main content area for the JS to insert the sub-pages into, such as id="content"

## Routes

#### / 
- Will display two randomised submissions, with the images formatted to the same size with a border (circle?) and the title beneath each.
- Users will be able to click one of the two images to vote. Once an image is clicked, two more randomised images will be selected.
- If there is no user signed in, Randomised images will still appear but clicking on the images will do nothing.

#### /about.js
- displays a simple About page explaining the concept behind the app and how to use it.

#### /login
- sign in form submits to /api/login

### /api/login 
- processes the login forms by setting a cookie and redirecting to homepage

#### /signup
- sign in form submits to /api/signup

### /api/signup
- processes the signup form by adding the user to the database, setting a cookie, then redirecting to the homepage

### /logout
- Deletes the cookie, logging the user out, then redirects them to the homepage.

#### /post
- shows a form to submit a new image URL and title via /api/post. (future development - allow the user to upload an image). If user is not authenticated, display 403 (forbidden)

### /api/post
- proceses the new posts by submitting the form contents to the database then redirecting to the user's profile

### /profile/leaderboard
- lists all submissions by title, with total vote count next to it. If user is not authenticated, display 403 (forbidden)

### /profile/:username
- shows all submissions posted by the selected user, with vote count next to it. If logged in user is the same user as this profile, then edit/delete buttons show up next to each post. Clicking delete POSTs a delete command directly to the API such as /api/del/:postid

### /api/del/:postid
- process the deletion of the postID and redirect to profile page.

### /leaderboard
- list of all items on the entire site, sorted by votes.


## Sitemap

- Homepage - shows two randomised images with titles beneath. User will click the image or title to vote. Once image is clicked, another set of randomised images will replace it.
- About - a static block of text with some information on the site, such as its purpose, origins, how to use the site, etc.
- Post - a form to submit new items to the site, 403s if user isn't logged in.
- Profile/username - list of submissions made by the selected user. Submissions are ranked by total vote count. User can click delete next to their submissions to delete from database.
- Leaderboard - a list of all submissions ranked by total vote count.
- Log Out - logs the usero ut
- Sign Up - form to sign up, submits to API
- Log In - form to log in, submits to API


# BACK END

## Database

### Users
- UserID (unique primary)
- Username (text)
- Password (password)
- SessionID (text)


### Posts
- PostID (Unique Primary)
- PostTitle (text)
- PostImg (text)
- UserID(text) (the user who posted this item)
- Votes (Integer)
- GamesPlayed (integer)


# PROJECT NOTES

## Inspiration

```
\\ here i can put formatted code in

function triangle {
	
}
```

![[Pasted image 20230615162606.png]]

![[Pasted image 20230615162433.png]]

![[Pasted image 20230615162523.png]]


## Tools we need

- Express JS
- Mongo DB
- some other stuff
- render.com?
- 

## TODO

- set up express
- set up mongo
- connect to express
- set up a script for dummy db data for testing - a few posts etc.

## Future Enhancements

- track number of times submission is included in a vote. Can then display number of votes vs number of times included ie like a KD Ratio 
- profanity and lewd image filter
- 