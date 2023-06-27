function renderSignUpForm() {
  
  //signup page heading and form
  const page = document.getElementById("page");
  const heading = document.createElement("h1");
  heading.textContent = "Signup";
  const form = document.createElement("form");
  form.innerHTML = `
      <label for="name">Name:</label>
      <input type="text" name="name">
      <label for="username">username: </label>
      <input type="text" name="username">
      <label for="password">Password: </label>
      <input type="password" name="password">
      <input type="submit">
  `;

  // creates page and error msg
  const errorMsg = document.createElement("p");
  errorMsg.id = "error-msg";
  page.replaceChildren(heading, form, errorMsg);


  // event listener
  form.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = new FormData(form);

      // packs data ready to rock
      const data = {
        name: formData.get("name"),
        username: formData.get("username"),
        password: formData.get("password"),
      };
    
      // another axios send
      axios.post("/api/signup", data)
      .then((_) => {
        renderGame();
      }).catch((error) => {            
          errorMsg.textContent = error.response.data.message;
      });
  });      
}