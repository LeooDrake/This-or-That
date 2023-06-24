import renderHeader from "./components/onload/header.js";
import renderNav from "./components/onload/nav.js";
import renderGame from "./components/onload/game.js";




renderHeader();
renderNav(); // This creates buttons with onclicks that uses above stuff;
renderGame();

document.querySelectorAll('img').forEach(element =>{
    element.addEventListener(('click'),(event)=>{
        console.log('click')
        console.log(event.target.id)
        axios.patch(`/api/submission/${event.target.id}`)

})

})