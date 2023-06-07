const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true, default:"admin"}
})

userSchema.pre("save", function(next){
    let hash = bcrypt.hashSync(this.password, 10);
    this.password = hash
    next()
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const user = mongoose.model("users", userSchema);

module.exports = user;