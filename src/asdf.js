import {appDb} from "./db/appDb.js";
import {errorHandler} from "./utils/errorHandler.js"

async function asdf(){
  console.log(await appDb.connected);
  // let user = new appDb.models.Users({name:"test_name_1", username:"test_uname_1", password_hash: "test_pw_1"})
  // await user.save();
  console.log(await appDb.models.Users.find({}));
}

await asdf();
