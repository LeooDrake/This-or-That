function renderHeader() {
    setHeaderHTML();
}

function setHeaderHTML() {
    const header = document.getElementById("header-nav");
    header.innerHTML = 
    `
      <h1>This or That</h1>
        <nav class="navbar navbar-expand-lg">
          <a class="btn btn-success mx-2" href="#" onClick="renderLoginForm()">LOG IN</a>
          <a class="btn btn-success mx-2" href="#" onClick="renderAboutPage()">ABOUT</a>
          <a class="btn btn-success mx-2" href="#" onClick="DoLeaderboard()">LEADERBOARD</a>
          <a class="btn btn-success mx-2" href="#" onClick="DoUserProfile()">PROFILE</a>
        </nav>
    `;

}
