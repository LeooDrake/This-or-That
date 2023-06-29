

function renderProfile(){
    let page = document.getElementById("page");

    app.get('/getcookie', (req, res) => {
        const userID = req.cookies.UserID;
        console.log(userID);
      });

    // let id =req.cookie.UserID
    // console.log(id)

    //                res.cookie('UserID', user._id).send('cookie set');


    
      return
}