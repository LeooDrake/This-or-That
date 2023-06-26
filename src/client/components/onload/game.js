export default function renderGame() {
    var thatImage;
    var thisImage;
    const page = document.getElementById("page");
    const heading = document.createElement("h1");
    heading.textContent = "THIS IS THE MAIN GAME DEALY";
    const content = document.createElement("div"); // create it 
    content.classList.add("my-4") // add the class and IDs
    // fill it below. picsum.photos generates random images!
    const randPop = function(arr){
        return arr.splice(Math.floor(Math.random()*arr.length), 1)[0];
    }
    axios.get('/api/submission').
    then(response =>{
        let retrieved = response.data;
        // missing default handle for retrieving < 2 images
        let thatImage = randPop(retrieved);
        let thisImage = randPop(retrieved);
        content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-5" id="this">
                    <h2>${thisImage.title}</h2>
                    <img style="width:400px" style="height:400px" src=${thisImage.image_url} id="${thisImage._id}")"></img>
                </div>
                <div class="col-2"><p>VS</p></div>
                <div class="col-5" id="that">
                    <h2>${thatImage.title}</h2>
                    <img style="width:400px" style="height:400px" src=${thatImage.image_url} id="${thatImage._id}"></img>
                </div>
            </div>
        </div>
        `;
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("my-4");
        page.replaceChildren(heading, errorDiv, content);

        document.querySelectorAll('img').forEach(element =>{
            element.addEventListener(('click'),(event)=>{
                console.log('clicked')
                console.log(event.target.id)
                axios.patch(`/api/submission/upvote/${event.target.id}`)
        
        })
        
        })

    })
    /*
    ############################################################
                   # 2 random imgs & Voting #
    ###########################################################
    currently 2 random photos are being grabbed from picsum.
    IDEALLY: using api to get img collection and 
    use math.rand to get random. ID and img src needed. 
    ############################################################


    */
}