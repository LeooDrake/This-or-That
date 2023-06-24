export default function renderNav(){
    let nav = document.body.querySelector("#nav");
    nav.innerHTML = `
    <div class="navbar navbar-expand-lg">
        <a class="btn btn-success mx-2" href="#" onClick="renderLogin()">LOG IN</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderAbout()">ABOUT</a>
        <a class="btn btn-success mx-2" href="#" onClick="DoLeaderboard()">LEADERBOARD</a>
        <a class="btn btn-success mx-2" href="#" onClick="DoUserProfile()">PROFILE</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderSignUpForm()">SIGN UP</a>
        <a class="btn btn-success mx-2" href="#" onClick="logoutSite()">LOG OUT</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderImageSubmit()">SUBMIT IMAGE</a>

    </div>
    `
}