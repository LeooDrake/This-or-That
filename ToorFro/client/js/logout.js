
function logoutSite() {
    document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("The user is logged out and cookie cleared")
}

