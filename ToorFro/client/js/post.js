// this page should work, however i have not done the api side of this

function renderPost() {
    
    // adds a heading
    let page = document.getElementById("page");
    let heading = document.createElement("h1");
    heading.textContent = "Add Item";

    // creates sign up form!
    let form = document.createElement("form");
    form.innerHTML = `
        <label for="title">Title: </label>
        <input type="text" name="title">
        <label for="imgurl">Image URL: </label>
        <input type="text" name="imgurl">
        <input type="submit">
    `;

    // puts form on page
    page.replaceChildren(heading, form);


    // our old friend event listener
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form);


        // packages it up for api
        let data = {
            title: formData.get("title"),
            imgurl: formData.get("imgurl"),
        };
        

        // api send
        axios.post("/api/post", data).then((_) => {
            renderHeader();
            renderGame(); 
            console.log("you have posted summin new")
        });
    });      
}

