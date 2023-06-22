
function logoutSite() {
    axios.delete("/api/session").then((_) => {
        console.log("this thing just logged out")
        renderHeader();
        renderGame(); // or whatever the game function is called when we build it!
    });
}