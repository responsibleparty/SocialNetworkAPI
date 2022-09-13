const {
    ObjectId
} = require('mongoose').Types;
const {
    User,
    Thought
} = require('../models');

const userCount = async () => {
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);
}


module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObject = {
                    users,
                    userCount: await userCount(),
                };
                return res.json(userObject);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .select('-__v')
            .then(async (user) =>
                !user ?
                res.status(404).json({
                    message: 'No user with that ID'
                }) :
                res.json({
                    user
                }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({
                _id: req.params.userId
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'No user found'
                }) :
                res.json('user deleted')
            )
    }
}