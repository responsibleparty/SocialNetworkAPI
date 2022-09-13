const {
    Schema,
    model
} = require('mongoose');

const userSchema = new Schema({
    //should be unique, required and trimmed.
    username: {
        type: String,
        require: true,
        unique: true
    },
    //required, and unique, must be valid email address, so find validation on mongoose
    email: {
        type: String,
        require: true,
        unique: true
    },
    //thoughts will be an array of _id referencing the thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    //friends will be an array of _id that reference User model
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    //create a virtual called friendCount that will retrieve the length of the friends array.
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });

const User = model('user', userSchema);

module.exports = User;