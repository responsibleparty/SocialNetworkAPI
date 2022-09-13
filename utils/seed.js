const connection = require('../config/connection');
const {
    User,
    Thought
} = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected!!');

    //drop documents if they exist.
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    //create for loop to add users into array

    //create functions to pair thoughts with users

    //create function that pairs reactions with thoughts.

    //create function that makes email address.

    //User.collection.insertMany(users);

    //Thoughts.collection.insertMany(thoughts)

    console.table(users);
    console.info('seeding complete');
    process.exit(0);

});