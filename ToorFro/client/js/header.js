function renderHeader() {
    const header = document.getElementById("header");
    header.innerHTML = `
    <a class="link-light link-underline-opacity-25 link-underline-opacity-100-hover center-heading" href="/"><h1>To and Fro</h1></a>
    <div class="navbar navbar-expand-lg">
        <a class="btn btn-success mx-2" href="#" onClick="renderPost()">ADD POST</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderLogin()">LOG IN</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderAbout()">ABOUT</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderLeaderboard()">LEADERBOARD</a>
        <a class="btn btn-success mx-2" href="#" onClick="DoUserProfile()">PROFILE</a>
        <a class="btn btn-success mx-2" href="#" onClick="renderSignUpForm()">SIGN UP</a>
        <a class="btn btn-success mx-2" href="#" onClick="logoutSite()">LOG OUT</a>
   </div>
   `;
}
