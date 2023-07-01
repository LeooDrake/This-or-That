// import { ObjectId } from "mongodb";

// Cookie handling, and login check needed.
function renderSubmissionForm(){
    // adds a heading
    axios.get('/api/session').then(
        response => {
            if (response.data.session){
                let page = document.getElementById("page");
                let heading = document.createElement("h2");
                heading.textContent = "Add Item";
                // creates sign up form!
                let form = document.createElement("form");
                form.innerHTML = `
                    <label for="title">Title: </label>
                    <input type="text" name="title">
                    <label for="imgurl">Image URL: </label>
                    <input type="text" name="imgurl">
                    <input type="hidden" name="id" value="${response.data._id}">
                    <input type="submit">
                `;
                // puts form on page
                page.replaceChildren(heading, form);
                // our old friend event listener
            }
            else{
                return
            }
        }
    )

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form);
        // packages it up for api
        console.log(document.cookie);
        // Cookie is a string, might need to string.split() and stuff to get userID
        let data = {
            postTitle: formData.get("title"),
            imageURL: formData.get("imgurl"),
            userID: formData.get("id") // Do something to grab the userID from the cookie.
        };
        // api send
        axios.post("/api/submissions", data).then((_) => {
            renderHeader();
            renderGame();
            console.log("you have posted summin new");
        });
    });      
}

