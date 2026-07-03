const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");

mongoose.connect("MONGO_COMPASS")
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
