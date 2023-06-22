function renderLogin() {
    let page = document.getElementById("page");
    let heading = document.createElement("h1");
    heading.textContent = "Login";
    let form = document.createElement("form");
    form.innerHTML = `
        <label for="username">Username: </label>
        <input type="text" name="username">
        <label for="password">Password: </label>
        <input type="password" name="password">
        <input type="submit">
    `;
    page.replaceChildren(heading, form);

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form);

        let data = {
            username: formData.get("username"),
            password: formData.get("password"),
        };
        
        axios.post("/api/session", data).then((_) => {
            renderHeader();
            renderChallengeList();
        });
    });      
}

console.log("LOGIN!!!")