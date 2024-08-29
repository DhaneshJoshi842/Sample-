const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
let ExpressErr = require("./ExpressError.js");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// requiring the chat model in this file 

const chat = require("./Models/chat.js");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Watsapp');
    // here the above url is used to connect with perticualar data base here we connect with the test data base 
}

main().then((res) => {
    console.log("sucsess!!");
})
    .catch(err => console.log(err));




app.listen(8080, () => {
    console.log("server is listning");
})


app.get("/", (req, res) => {
    res.send("hello dhanesh Ji");
})

app.get("/chats", async (req, res) => {

    const all_messages = await chat.find();
    res.render("index.ejs", { all_messages });

});


app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/chats/:id/edit", async (req, res, next) => {
    let { id } = req.params;
    // applying try catch to handle the error and if the error comes then that was passed to error handling middle ware 
    console.log(id)
    try {
        let selected_chat = await chat.findById(id);
        console.log(selected_chat);
        res.render("edit.ejs", { selected_chat });
    }
    catch (err) {
        next(err);
    }
});

app.post("/chats/:id", async (req, res) => {
    console.log("hii");
    let { id } = req.params;
    let { new_message } = req.body;
    console.log(new_message);
    let updated_chat = await chat.findByIdAndUpdate(id, { msg: new_message }, { run_validators: true, new: true });
    console.log(updated_chat);
    res.redirect("/chats");
})


app.post("/chats/:id/delete", async (req, res) => {
    let { id } = req.params;
    let del = await chat.findOneAndDelete(id, { run_validators: true, new: true }).then((del) => {
        res.redirect("/chats");
    }).catch((err) => {
        console.log(err);
    })

})

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    if (!to) {
        return res.status(400).send("The 'to' field is required.");
    }
    let newchat = new chat({
        from: from,
        to: to,
        msg: msg,
        time: new Date(),
    })
    newchat.save().then((result) => {
        console.log("saved successfully")
        res.redirect("/chats");
    }).catch(err => {
        console.error("Error saving chat:", err);
        res.status(500).send("Error saving chat");
    });
});

// error handling middle ware 
app.use((err, req, res, next) => {
    res.send("Error");
}
);