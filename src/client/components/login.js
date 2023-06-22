
function renderLoginForm() {
    const page = document.getElementById("page");
    const heading = document.createElement("h1");
    heading.textContent = "Login";
    const form = document.createElement("form");
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
        const formData = new FormData(form);

        const data = {
            username: formData.get("username"),
            password: formData.get("password"),
        };
        
        axios.post("/api/session", data).then((_) => {
            renderHeader();
            renderGame(); // whatever we call the game
        });
    });      
}