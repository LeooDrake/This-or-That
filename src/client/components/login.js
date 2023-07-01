function renderLogin() {
    let page = document.getElementById("page");
    let heading = document.createElement("h2");
    heading.textContent = "Login";
    

    // builds a login form
    let form = document.createElement("form");
    form.innerHTML = `
        <label for="username">Username: </label>
        <input type="text" name="username">
        <label for="password">Password: </label>
        <input type="password" name="password">
        <input type="submit">
    `;

    // another error box! thought was cute, might build later
    let errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    page.replaceChildren(heading, form, errorMsg);

    // submit button
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form);

        // dumps username and pw to send to api
        let credentials = {
            username: formData.get("username"),
            password: formData.get("password"),
        };

        // send it! (to the api, that is)
        axios.post("/api/login", credentials)
            .then((_) => {
                renderNav();
                renderGame();
            })
            .catch((error) => {
                errorMsg.textContent = error.response.data.message;
            })
        ;
    });
    return;
}