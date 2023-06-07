const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
    actorname:{type:String, required:true}
})

const actor = mongoose.model("actors", actorSchema);

module.exports = actor;