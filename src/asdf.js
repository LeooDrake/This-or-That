import {appDb} from "./db/appDb.js";

async function asdf(){
  console.log(await appDb.ready)
  // let user = new appDb.models.Users({name:"test_name_1", username:"test_uname_1", password_hash: "test_pw_1"})
  // await user.save();
  let results = await appDb.models.Users.find({}).exec();
  console.log(results);
  
  appDb.db.close();
  return true;
}
console.log("aaaa", await asdf());