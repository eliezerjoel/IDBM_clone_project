const express = require("express");
const app = express();
const connect = require("./config/db");
const usercontroller = require("./controllers/user.controller");
const moviecontroller = require("./controllers/moive.controller");

app.use(express.json());
require("dotenv");

const port = process.env.PORT  || 8080 ;

app.use("/user", usercontroller);
app.use("/movie", moviecontroller);

app.listen(port, async()=>{
    try {
        await connect();
        console.log(`Listening on port ${port}`);
    } catch (error) {
        console.log({error:error.message});
    }
    
})