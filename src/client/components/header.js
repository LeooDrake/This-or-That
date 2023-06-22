function renderHeader() {
    setHeaderHTML();
}

function setHeaderHTML() {
    const header = document.getElementById("header-nav");
    header.innerHTML = 
    `
      <a class="link-light link-underline-opacity-25 link-underline-opacity-100-hover" href="/"><h1>This or That</h1></a>
        <nav class="navbar navbar-expand-lg">
          <a class="btn btn-success mx-2" href="#" onClick="renderLoginForm()">LOG IN</a>
          <a class="btn btn-success mx-2" href="#" onClick="renderAboutPage()">ABOUT</a>
          <a class="btn btn-success mx-2" href="#" onClick="DoLeaderboard()">LEADERBOARD</a>
          <a class="btn btn-success mx-2" href="#" onClick="DoUserProfile()">PROFILE</a>
          <a class="btn btn-success mx-2" href="#" onClick="renderSignUpForm()">SIGN UP</a>
          <a class="btn btn-success mx-2" href="#" onClick="logoutSite()">LOG OUT</a>
        </nav>
    `;

}
