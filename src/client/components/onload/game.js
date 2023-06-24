export default function renderGame() {
    const page = document.getElementById("page");
    const heading = document.createElement("h1");
    heading.textContent = "THIS IS THE MAIN GAME DEALY";
    const content = document.createElement("div"); // create it 
    content.classList.add("my-4") // add the class and IDs
    // fill it below. picsum.photos generates random images!
    content.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-5">
                <h2>THIS</h2>
                <a href="/vote/ID"><img class="rounded-circle border border-success" src="https://picsum.photos/400/400?random=1"></a>
            </div>
            <div class="col-2"><p>VS</p></div>
            <div class="col-5">
                <h2>THAT</h2>
                <a href="/vote/ID"><img class="rounded border border-warning" src="https://picsum.photos/400/400?random=2"></a>
            </div>
        </div>
    </div>
    `;
    // i use a href above but we should prob make it an onclick or something instead
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("my-4");
    page.replaceChildren(heading, errorDiv, content);

}