function renderGame(){
    //document.cookie displays existing cookie, this is a test to see if they are logged in
    let headings = [
        "Who would win?",
        "Pick your pill",
        "DEADLY GAME",
        "You are the senate",
        "POWER PICK",
        "Chronoclicks",
        "Could be portals 2",
        "Epic Picks",
        "For Glory!",
        "Silly msg hehe xd",
        "💯🔥💫☄️ 🇪mojis work?! 🫥⚡️🌈 "
    ];
    let heading = headings[Math.floor(Math.random() * headings.length)];
    axios.get('/api/session').then
    (response =>{
        if(response.data.session){
            console.log(`session id:${response.data._id}`)
        }
        else{
            console.log('no session found')     // have we implemented logic so that you cant vote if you are signed in or are we ignoring for now?
        }   
    })
    let pageElem = document.getElementById("page");
    let headingElem = document.createElement("h2");
    headingElem.textContent = heading; // we can change this
    headingElem.setAttribute("class", "center-heading");
    // creates wrapper
    let contentElem = document.createElement("div");
    contentElem.classList.add("my-4")
    // get the daata
    axios.get('/api/submissions/random/2').then(documents =>{
        thisImg = documents.data[0];
        thatImg = documents.data[1];
        //builds the game page
        contentElem.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-5 imgOuter" id="thisImgOuter">
                    <img class="img-size img-left" src=${thisImg.image_url} id="${thisImg._id}")" />
                </div>
                <div class="col-2 center-heading vs">VS</div>
                <div class="col-5 imgOuter" id="thatImgOuter">
                    <img class="img-size img-right" src=${thatImg.image_url} id="${thatImg._id}")" />    
                </div>
            <div class="row imgTitleRow">
                <div class="col-5 text-left" id="thisTitle">
                    <h2>${thisImg.title}</h2>
                </div>
                <div class="col-2"></div>
                <div class="col-5 text-right" id="thatTitle">
                    <h2>${thatImg.title}</h2>
                </div>
            </div>
        </div>
        `;
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("my-4");
        pageElem.replaceChildren(headingElem, errorDiv, contentElem);
        document.querySelectorAll('img').forEach(element =>{
            element.addEventListener(('click'),(event)=>{
                console.log(`upvoted: ${event.target.id}`);
                axios.get(`/api/upvote/${event.target.id}`);
                renderGame();
                return;
            })
        })
    })
    return;
}