function renderAboutPage() {
    const page = document.getElementById("page");
    const heading = document.createElement("h1");
    heading.textContent = "About this page";
    const about = document.createElement("about");
    about.innerHTML = `
        <p>make em say uuuh</p>
    `;
    page.replaceChildren(heading, about);

   
};