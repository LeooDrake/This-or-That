
function renderImageSubmit(){
    const page = document.getElementById("page");
    const form = document.createElement('form')
    const heading = document.createElement("h1");
    heading.textContent = "Submit Photo";
    /*
            "postTitle": request.body.postTitle,
            "imageURL": request.body.imageURL,
            "userID": request.body.userID,
    */


    form.innerHTML = `
        <label>Title</label>
        <input type="text" name="postTitle"></input>
        <label>imageURL</label>
        <input type="text" name="imageURL"></input>
        <input type="hidden" name="userID" value="1"></input>
        <input type="submit"></input>

    `
    const errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    page.replaceChildren(heading, form, errorMsg);

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        const formData = new FormData(form);

        const data ={
            postTitle: formData.get('postTitle'),
            imageURL: formData.get('imageURL'),
            userID: formData.get('userID'),

        }

        axios.post("/api/submission", data)
        .then((_) => {
          renderGame();
        }).catch((error) => {            
            errorMsg.textContent = error.response.data.message;
        });

    })
}