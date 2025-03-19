const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    phone:{
        type:Number,
        required:true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[6-9][0-9]{9}$/.test(v); // Indian phone number example
            },
            message: 'Phone number must be 10 digits and start with 6-9!'
        }
    },email: {
        type: String,
        required: true,
        trim: true
      },
    
    passkey:{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^.{8,16}$/.test(v); // Ensures 8-16 characters
            },
            message: props => 'Password must be between 8 and 16 characters long!'
        }
    },
    image: { type: String, default: '/img/profile.png' },
    usertype:{
        type:String,default:'user'
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('passkey')) { // Only hash if the password is new or modified
        this.passkey = await bcrypt.hash(this.passkey, 10); // Hash the password
    }
    next();
});
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema)