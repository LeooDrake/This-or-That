async function renderProfile(){
    let pageElem = document.getElementById("page");
    let hasSession;     // whether is true
    let sessionID;
    
    // get session
    try{
        let response = await axios.get('/api/session');
        sessionID = response.data._id;
        hasSession = response.data.session;
    }catch(error){
        console.log(error);
    }
    
    // ends if user isnt signed in but could redirect to login
    if(hasSession == false || hasSession == undefined){ return }
    
    // rest of everything
    try{
        let containerElem = document.createElement('div');
        let submissions = await axios.get('/api/submissions');
        submissions.data.forEach(submission => {
            if (submission.user == sessionID){ // THIS IS LOGIC FOR IF IMAGE MATCHES USER
                let rowDiv = document.createElement("div");
                rowDiv.className = "row my-5";
                rowDiv.id = `row_${submission._id}`;
                rowDiv.innerHTML = `
                    <div class="col-3" id="thumb-img">
                        <img style="width:100px; height:auto" src="${submission.image_url}" />
                    </div>
                    <div class="col-6" id="leader-title">
                        <h3>${submission.title}</h3>
                    </div>
                    <div class="col-3" id="leader-vote">
                        <button class="delButton" id="${submission._id}">DELETE POST</button>
                    </div>
                `;
                containerElem.appendChild(rowDiv);
            }
        })
        pageElem.replaceChildren(containerElem);
        pageElem.querySelectorAll('.delButton').forEach(button =>{
            let rowElem = document.querySelector(`#row_${button.id}`);
            button.addEventListener('click', async (event)=>{
                await axios.delete(`/api/submissions/${button.id}`);
                rowElem.remove();
                console.log('image deleted');
                return;
            })
        })
    }catch (error) {
        console.log(error);
    }
    return;
}