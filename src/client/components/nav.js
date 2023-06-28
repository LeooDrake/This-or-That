function renderNav(){
    let nav = document.body.querySelector("#nav");
    nav.innerHTML = 
        `
        <div class="navbar navbar-expand-lg justify-content-center">
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderSubmissionForm()">ADD STUFF</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderLogin()">LOG IN</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderAbout()">ABOUT</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderLeaderboard()">LEADERBOARD</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="DoUserProfile()">PROFILE</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderSignUpForm()">SIGN UP</a>
            <a class="btn btn-info mx-2 nav-button" href="#" onClick="logoutSite()">LOG OUT</a>
        </div>
        `
    ;
}