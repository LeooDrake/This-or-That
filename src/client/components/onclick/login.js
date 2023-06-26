// import { compareSync } from "bcrypt";


function renderLogin() {
    let page = document.getElementById("page");
    let heading = document.createElement("h1");
    heading.textContent = "Login";
    let form = document.createElement("form");
    const errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    form.innerHTML = `
        <label for="username">Username: </label>
        <input type="text" name="username">
        <label for="password">Password: </label>
        <input type="password" name="password">
        <input type="submit">
    `;
    page.replaceChildren(heading, form, errorMsg);


    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form);

        let data = {
            username: formData.get("username"),
            password: formData.get("password"),
        
        };

        let query ={username:formData.get("username")}

        axios.get('/api/users').
        then(documents =>{
            // console.log(documents.data)
    
            documents.data.findOne(query).then(
                response=>{
                    console.log(response)
                }
            )
            console.log(user)
            if (user== null){
                errorMsg.textContent="username not in database"
                return

            }
            let validity = bcrypt.compareSync(data.password,user.hashedpassword)
            console.log(validity)
            if(validity){
                request.session.id =user._id;
            }
            else{
                errorMsg.textContent="username or password incorrect"
            }




        })
        
        // axios.post("/api/session", data).then((_) => {
        //     renderHeader();
        //     renderGame(); // whatever we call the game
        // });
    });      
}

// console.log("LOGIN!!!")