



export default function renderGame() {
    var thatImage;
    var thisImage;
    const page = document.getElementById("page");
    const heading = document.createElement("h1");
    heading.textContent = "THIS IS THE MAIN GAME DEALY";
    const content = document.createElement("div"); // create it 
    content.classList.add("my-4") // add the class and IDs
    // fill it below. picsum.photos generates random images!

    axios.get('/api/submission').
    then(documents =>{
        //console.log(documents)
        let thatRandomIndex =Math.floor(Math.random()*documents.data.length)
        let thisRandomIndex =Math.floor(Math.random()*documents.data.length)
        //console.log(Object.values(documents.data))
        //console.log(documents.data[thatRandomIndex])
        thatImage = documents.data[thatRandomIndex]
        thisImage = documents.data[thisRandomIndex]
        content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-5" id="this">
                    <h2>THIS</h2>
                    <img style="width:400px" style="height:400px" src=${thisImage.imageURL} id="${thisImage._id}")"></img>
                </div>
                <div class="col-2"><p>VS</p></div>
                <div class="col-5" id="that">
                    <h2>THAT</h2>
                    <img style="width:400px" style="height:400px" src=${thatImage.imageURL} id="${thatImage._id}"></img>
                </div>
            </div>
        </div>
        `;
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("my-4");
        page.replaceChildren(heading, errorDiv, content);

        console.log(document.querySelectorAll('img'))
        document.querySelectorAll('img').forEach(element =>{
            element.addEventListener(('click'),(event)=>{
                console.log('click')
                console.log(event.target.id)
                axios.patch(`/api/submission/${event.target.id}`)
        
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