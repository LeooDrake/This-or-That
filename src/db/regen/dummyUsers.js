import bcrypt from "bcrypt";
import { appDb } from "../appDb.js";

const dummyUsers = 
[
    {
        name: "Alex",
        username: "tadyen",
        password: "asdf",
    },
    {
        name: "Justin",
        username: "jlabruna",
        password: "asdf",
    },
    {
        name: "Leo",
        username: "LeooDrake",
        password: "asdf",
    }
];

export async function regenDummyUsers(){
    await appDb.ready;
    // replace password with password_hash
    dummyUsers.forEach((user)=>{
        let password_hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        delete user.password;
        Object.assign(user, {password_hash});
    });
    // wipe and insert into db 
    await appDb.models.Users.deleteMany({}).exec();
    await appDb.models.Users.insertMany(dummyUsers);
    return true;
}