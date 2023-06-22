export default function renderHeader(){
  let header = document.getElementById("header");
  header.innerHTML = 
    `
    <a class="link-light link-underline-opacity-25 link-underline-opacity-100-hover" href="/"><h1>This or That</h1></a>

    `
    ;
}