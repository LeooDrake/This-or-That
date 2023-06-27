
function renderGame() {
    //document.cookie displays existing cookie, this is a test to see if they are logged in
    if (document.cookie) {
        console.log("The cookie is: " + document.cookie)
    } else {
        console.log("come to the Light Side, we don't have cookies") // no cookie found
    }

    const page = document.getElementById("page");
    const heading = document.createElement("h3");
    heading.textContent = "Who would win in a battle royale?"; // we can change this
    heading.setAttribute("class", "center-heading")
    // creates wrapper
    const content = document.createElement("div");
    content.classList.add("my-4")
    // get the daata
    axios.get('/api/home').then(documents =>{
        console.log(documents)
        toImage = documents.data.array1      
        froImage = documents.data.array2
        //builds the game page
        content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-5" id="this">
                    <a href="/api/vote/${toImage._id}"><img class="img-size" src=${toImage.url} id="${toImage._id}")" /></a>
                    <h2>${toImage.title}</h2>
                </div>
                <div class="col-2"><p>VS</p></div>
                <div class="col-5" id="that">
                <a href="/api/vote/${froImage._id}"><img class="img-size" src=${froImage.url} id="${froImage._id}")" /></a>    
                    <h2>${froImage.title}</h2>
                </div>
            </div>
        </div>
        `;
    })
    // was gonna put an errorbox but its not needed (since errors would appear on diff screen)  
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("my-4");
    page.replaceChildren(heading, errorDiv, content);
}


