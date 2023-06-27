import { appDb } from "../appDb.js";
const dummySubmissions =
[
    {
        title: "Apple",
        image_url: "https://cdn0.woolworths.media/content/wowproductimages/large/306343.jpg",
        username: "tadyen",
        total_votes: 0
    },
    {
        title: "corgi",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG",
        username: "jlabruna",
        total_votes: 0
    },
    {
        title: "Fred",
        image_url: "https://t4.ftcdn.net/jpg/01/89/54/45/360_F_189544505_bIxudrpBsIU9RNdSuiBRhmUfVfrjEUXf.jpg",
        username: "LeooDrake",
        total_votes: 0
    },
    {
        title: "Mum's old Holden Barina",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/1997-2000_Holden_Barina_%28SB%29_City_3-door_hatchback_%2819794335806%29.jpg/1599px-1997-2000_Holden_Barina_%28SB%29_City_3-door_hatchback_%2819794335806%29.jpg?20151231020917",
        username: "tadyen",
        total_votes: 0
    },
    {
        title: "IKEA Kivik Sofa",
        image_url: "https://www.ikea.com/au/en/images/products/kivik-3-seat-sofa-with-chaise-longue-tibbleby-beige-grey__1056147_pe848280_s5.jpg",
        username: "jlabruna",
        total_votes: 0
    },
    {
        title: "Ravi Shankar playing a Sitar",
        image_url: "https://i.ebayimg.com/images/g/PXoAAOSwCXJkeATL/s-l500.jpg",
        username: "LeooDrake",
        total_votes: 0
    },
    {
        title: "1968 Boston Celtics",
        image_url: "https://nbahoopsonline.com/teams/BostonCeltics/History/Championship/Champs_67_68.jpg",
        username: "tadyen",
        total_votes: 0
    },
    {
        title: "Minecraft Cosplayers kicking a Sand Castle",
        image_url: "https://static1.fjcdn.com/comments/Blank+_554da744a3c57e71b1d135cf90c93ecf.jpg",
        username: "jlabruna",
        total_votes: 0
    },
    {
        title: "Woman Jumping Rope",
        image_url: "https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Is-Rope-Jumping-Good-For-Health-Benefits-And-Precautions.jpg",
        username: "LeooDrake",
        total_votes: 0
    },
    {
        title: "Harley Davidson Tough Trike",
        image_url: "https://m.media-amazon.com/images/I/61F3p01-OpL.jpg",
        username: "tadyen",
        total_votes: 0
    },
    {
        title: "Macho Man Randy Savage",
        image_url: "https://image-cdn.essentiallysports.com/wp-content/uploads/Randy-Savage-3-370x355.png",
        username: "jlabruna",
        total_votes: 0,
    },
    {
        title: "Crab Juice",
        image_url: "https://static.simpsonswiki.com/images/3/30/Crab_Juice_Hit_%26_Run.png",
        username: "LeooDrake",
        total_votes: 0
    },
    {
        title: "Balrog",
        image_url: "https://www.denofgeek.com/wp-content/uploads/2022/10/lord-of-the-rings-of-power-balrog.jpg",
        username: "tadyen",
        total_votes: 0
    },
];
export async function regenDummySubmissions(){
    await appDb.ready;
    // list of unique usernames
    let usernames = dummySubmissions.reduce((aggregate, val)=>{
        if(!aggregate.includes(val.username)){
            aggregate.push(val.username);
        }
        return aggregate;
    },[]);
    // map of username to mongoose user
    let users = {};
    
    await Promise.all(
        usernames.map(async (username)=>{
            let user = await appDb.models.Users.where({username}).findOne().exec();
            Object.assign(users, {[username]: user});
        })
    );
    
    // replace username with user ids in dummySubmissions
    dummySubmissions.forEach((submission)=>{
        let uid = users[submission.username]._id;
        Object.assign(submission, {user: uid});
        delete submission.username;
    });
    // wipe and insert into db 
    await appDb.models.Submissions.deleteMany({}).exec();
    await appDb.models.Submissions.insertMany(dummySubmissions);
    return true;
}
