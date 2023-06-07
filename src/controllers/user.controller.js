const User = require("../model/userSchema.model");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


Router.post("/register", async(req, res) => {
    try {
        const {username, email, password, role} = req.body;

    const ispresent = await User.findOne({email});

    if (ispresent) {
        return res.send("User already registered!");
    }

    const createduser = await User.create({username, email, password, role});

    return res.status(201).send(createduser);

    } catch (error) {
        res.send({error:error.message});
    }
    
})

Router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;

    const ispresent = await User.findOne({email});

    if (!ispresent) {
        return res.send("User is not registered!");
    }

    // if (password !== ispresent.password) {
        // res.send("Invalid Password..");
    // }

    const compare = bcrypt.compareSync(req.body.password, ispresent.password);

    if (!compare) {
        res.send("Password is incorrect..");
    }

    const payload = {userId: ispresent._id, role: ispresent.role};
    const token = jwt.sign(payload, "troy", {expiresIn:"2h"});

    return res.status(201).send({message:"Logged in successfully", token:token});

    } catch (error) {
        res.send({error:error.message});
    }
    
})

module.exports = Router;