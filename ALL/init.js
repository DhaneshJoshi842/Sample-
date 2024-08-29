const mongoose = require("mongoose");


const chat = require("./Models/chat.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Watsapp');
    // here the above url is used to connect with perticualar data base here we connect with the test data base 
}

main().then((res) => {
    console.log("sucsess!!");
})
    .catch(err => console.log(err));

const chat1 = new chat(
    {
        from: "dhanesh",
        to: "abhay",
        msg: "kesa he bhai",
        time: new Date(),
    }
)

const chats =
    [

        {

            from: "dhanesh",
            to: "bhavya",
            msg: "whats up",
            time: new Date(),

        },
        {
            from: "dhanesh",
            to: "yana",
            msg: "give me my note book please",
            time: new Date(),
        },
        {
            from: "vivek",
            to: "dhanesh",
            msg: "message me the timing of gym",
            time: new Date(),

        },
        {
            from: "tanishk",
            to: "dhanesh",
            msg: "ha bhai",
            time: new Date(),
        },

        {
            from: "dhanesh",
            to: "ranjeet",
            msg: "yep!!",
            time: new Date(),
        }
    ]

chat1.save().then((res) => {
    console.log(res);
});

chat.insertMany(chats).then((res) => {
    console.log(res);                       
})