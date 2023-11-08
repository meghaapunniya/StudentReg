
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Studentschema = new Schema({
    firstname:{ type: String},
    lastname:{ type: String},
    regNo:{type:Number},
    email:{ type: String, required: true },
    phone:{type:Number},
    Images: 
    {
        data: Buffer,
        contentType: String
    },
    skills:{type:String},
    qualification:{type:String}
   
})
module.exports =  mongoose.model('Student', Studentschema);
