const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        username: {
            type: "string",
            required: true,
            min: 3,
            max: 30
        },
        
        email: {
            type: "string",
            required: true,
            max: 50,
            unique: true
        },

        password: {
            type: "string",
            required: true,
            min: 6
        },

        profilePicture: {
            type: "string",
            default: ""
        },

        Contacts: {
            type: Array,
            default: []
        },

        isAdmin: {
            type: Boolean,
            default: false
        }
    }
)
const user = mongoose.model('user', userSchema)
module.exports = user