function renderLeaderboard() {    
    // makes header
    const page = document.getElementById("page");
    const heading = document.createElement("h2");
    heading.textContent = "Leaderboard";

    // makes the container for the divs
    const content = document.createElement("div");
    content.classList.add("my-4")
    
    // makes a container for the content
    const container = document.createElement("div");
    container.classList.add("container")
    
    // get some data
    axios.get('/api/leaderboard').then(response =>{
        const data = response.data;
        // loop inserts html plus the row class as well as a bootstrap class to make it prettier
        data.forEach(item => {
            let submission = item.submission;
            const div = document.createElement("div");
            div.className = "row my-5";
            div.innerHTML = `
                    <div class="col-3" id="thumb-img">
                        <img style="width:100px; height:auto" src="${submission.image_url}" />
                    </div>
                    <div class="col-6" id="leader-title">
                        <h4>${submission.title}</h4>
                    </div>
                    <div class="col-3" id="leader-vote">
                    <h3>${submission.total_votes}</h3>
                    </div>
            `;
            // appends the row
            container.appendChild(div)
        });

    })
    // again i was going to do error divs vbut again not used
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("my-4");

    // builds the page 
    page.replaceChildren(heading, errorDiv, content);
    content.replaceChildren(container);
}
