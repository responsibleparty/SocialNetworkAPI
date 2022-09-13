const {
    Schema,
    model
} = require('mongoose');

//this is the sub schema that will live inside of the thoughtSchema

const reactionSchema = new Schema({
    //use mongooses ObjectId
    //required max is 280 characters
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const thoughtSchema = new Schema({
    //required must be between 1-280 characters
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    //this is a date set default value to the current timestamp.
    //use a getter method to format the timestamp on the query.
    createdAt: {
        type: Date,
        default: Date.now()
    },
    //the user that created the thought.
    username: {
        type: String,
        require: true
    },
    //this is how we use a subDocument.
    reactions: [reactionSchema]

}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;