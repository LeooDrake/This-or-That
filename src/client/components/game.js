function renderGame(){
    //document.cookie displays existing cookie, this is a test to see if they are logged in
    if(document.cookie){
        console.log("The cookie is: " + document.cookie)
    }else{
        console.log("come to the Light Side, we don't have cookies") // no cookie found
    }

    let page = document.getElementById("page");
    let heading = document.createElement("h3");
    heading.textContent = "GAME OF DEADLY MORTAL KOMBAT "; // we can change this
    heading.setAttribute("class", "center-heading");
    // creates wrapper
    let content = document.createElement("div");
    content.classList.add("my-4")
    // get the daata
    axios.get('/api/submissions/random/2').then(documents =>{
        thisImg = documents.data[0];
        thatImg = documents.data[1];
        //builds the game page
        content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-5" id="this">
                    <a href="/api/upvote/${thisImg._id}"><img class="img-size" src=${thisImg.image_url} id="${thisImg._id}")" /></a>
                    <h2>${thisImg.title}</h2>
                </div>
                <div class="col-2"><p>VS</p></div>
                <div class="col-5" id="that">
                <a href="/api/upvote/${thatImg._id}"><img class="img-size" src=${thatImg.image_url} id="${thatImg._id}")" /></a>    
                    <h2>${thatImg.title}</h2>
                </div>
            </div>
        </div>
        `;
    })
    // was gonna put an errorbox but its not needed (since errors would appear on diff screen)  
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("my-4");
    page.replaceChildren(heading, errorDiv, content);
    return;
}