function renderAbout(){
    let page = document.getElementById("page");
    let heading = document.createElement("h2");
    heading.textContent = "About this page";
    let about = document.createElement("div");
    about.classList.add("about");
    about.innerHTML = 
    `
    <p>Our website was born out of a long and hard journey that three indie developers embarked on. We faced many challenges along the way, but our passion for creating something unique and valuable kept us going. We wanted to create a platform that would make a difference in people's lives, and we knew that it would take a lot of hard work and dedication to achieve our goal.</p>
    <p>Our journey started with a simple idea, but it quickly grew into something much bigger. We spent countless hours brainstorming, designing, and coding, and we poured our hearts and souls into every aspect of the website. We wanted to create something that would stand out from the crowd, and we knew that it would take a lot of creativity and innovation to achieve our vision.</p>
    <p>Despite the many obstacles we faced, we never lost sight of our goal. We knew that our website had the potential to make a real difference in people's lives, and we were determined to see it through to the end. We worked tirelessly to refine our ideas, test our code, and create a platform that would be both functional and beautiful.</p>
    <p>Today, we are proud to share our website with the world. We hope that it will inspire others to pursue their dreams and never give up, no matter how hard the journey may be. We are grateful for the support of our users and the many people who helped us along the way, and we look forward to continuing to innovate and create in the years to come.</p>
    `;
    page.replaceChildren(heading, about);
}