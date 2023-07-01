function renderHeader(){
  let header = document.getElementById("header");
  header.innerHTML = 
    `
    <audio controls loop autoplay muted>
      <source src="/media/loop.mp3" type="audio/mpeg">
    </audio>
    <a href="/" style="text-decoration:none;">
      <h1>THIS OR THAT</h1>
    </a>
    `
  ;
}
// need to create a dir called sounds and put loop.mp3 in it, and get path right
