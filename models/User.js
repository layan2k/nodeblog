const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username:{
        type:String,
        required: [true,'Please Provide a username'],
        unique: true
    },
    password:{
        type:String,
        required: [true,'Please provide a password'],
      },
})
UserSchema.plugin(uniqueValidator)

UserSchema.pre('save',function(next){
    const user = this

    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash
        next()
    })
})

module.exports =  mongoose.model('User',UserSchema)