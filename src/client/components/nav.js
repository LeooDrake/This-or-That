function renderNav(){
    let nav = document.body.querySelector("#nav");
    
    axios.get('/api/session').then(
        response =>{
            if (response.data.session){
                nav.innerHTML = 
                `
                <div class="navbar navbar-expand-lg justify-content-center">
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderSubmissionForm()">ADD STUFF</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderAbout()">ABOUT</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderLeaderboard()">LEADERBOARD</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderProfile()">PROFILE</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="logoutSite()">LOG OUT</a>
                </div>
                `
            ;
            }
            else {
                nav.innerHTML = 
                `
                <div class="navbar navbar-expand-lg justify-content-center">
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderLogin()">LOG IN</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderAbout()">ABOUT</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderLeaderboard()">LEADERBOARD</a>
                    <a class="btn btn-info mx-2 nav-button" href="#" onClick="renderSignUpForm()">SIGN UP</a>
                </div>
                `
            ;
            }
        }
    )


}