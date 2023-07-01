function renderGame(){
    //document.cookie displays existing cookie, this is a test to see if they are logged in
    axios.get('/api/session').then
    (response =>{
        if(response.data.session){
            console.log(`session id:${response.data._id}`)
        }
        else{
            console.log('no session found')                 // have we implemented logic so that you cant vote if you are signed in or are we ignoring for now?
        }   
    })


    let page = document.getElementById("page");
    let heading = document.createElement("h2");
    heading.textContent = "WHO WOULD WIN?"; // we can change this
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
                    <img class="img-size img-left" src=${thisImg.image_url} id="${thisImg._id}")" />
                </div>
                <div class="col-2 center-heading vs">VS</div>
                <div class="col-5" id="that">
                    <img class="img-size img-right" src=${thatImg.image_url} id="${thatImg._id}")" />    
                </div>
            <div class="row">
                <div class="col-5 text-left" id="this">
                    <h2>${thisImg.title}</h2>
                </div>
                <div class="col-2"></div>
                <div class="col-5 text-right" id="that">
                    <h2>${thatImg.title}</h2>
                </div>
            </div>
        </div>
        `;
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("my-4");
    
    
        page.replaceChildren(heading, errorDiv, content);
        /*
        I had to move the api which was in the HREF
        because when image was clicked user was being redirected to the api.


        */
        document.querySelectorAll('img').forEach(element =>{
            element.addEventListener(('click'),(event)=>{
                console.log('click')
                console.log(event.target.id)
                axios.get(`/api/upvote/${event.target.id}`)
            })
    })
    // was gonna put an errorbox but its not needed (since errors would appear on diff screen)  

    

    
    
    })


        

    return;
}