

async function renderProfile(){
    let page = document.getElementById("page");
    let div = document.createElement('div');
    let sessionBoolean;     // whether is true
    let sessionID;
    let container = document.createElement('div')
    /* 


        let imageData = {
            "title": validator.unescape(req.body.postTitle),
            "image_url": validator.unescape(req.body.imageURL),
            "user": new mongoose.Types.ObjectId(req.body.userID),
            "total_votes": 0,
        }
    */
    try {
        let response = await axios.get('/api/session');
        sessionID = response.data._id;
        sessionBoolean = response.data.session;
        } catch (error) {
        console.log(error);
        }

        
    if (sessionBoolean== false|| sessionBoolean== undefined){
        return  // ends if user isnt signed in but could redirect to login
    }  
    
    try{
        var collections = await axios.get('/api/submissions');
        

        collections.data.forEach(collection => {

            // console.log(collection)
            // console.log('collection')

            
            if (collection.user == sessionID){ // THIS IS LOGIC FOR IF IMAGE MATCHES USER

            var submission = collection.title;
            const div = document.createElement("div");
            div.className = "row my-5";
            div.innerHTML = `
            <div class="col-3" id="thumb-img">
                <img style="width:100px; height:auto" src="${collection.image_url}" />
            </div>
            <div class="col-6" id="leader-title">
                <h3>${collection.title}</h3>
            </div>
            <div class="col-3" id="leader-vote">
            <button id="${collection._id}">DELETE POST</button>
            </div>
            `;      
            container.appendChild(div)
            // appends the row
            


                // form.innerhtml+=`
                // <img src="${collection.image_url}">
                // `
            }
            page.replaceChildren(container)
            page.querySelectorAll('button').forEach(button =>{
                button.addEventListener('click',(event)=>{
                    const response = axios.delete(`/api/submissions/${button.id}`);
                    console.log('image deleted')
                    
                })
                
            })
            
            
        
        })


    }catch (error) {
        console.log(error);
        }

    // axios.get('/api/submissions').then
    // (collections =>{
    //     // console.log(collections)
    //     // console.log('collections')
    //     // console.log(collection.data.user)
    //     // console.log('collections data')
    //     collections.forEach(collection => {
    //         if (collection.data.user._id == sessionID){ // what is id for user :(
    //             console.log('success')
    //         }
            
    //     });
        
    // })
       
    
      return
}