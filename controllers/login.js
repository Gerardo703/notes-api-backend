const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
    const { body } = request;
    const { userName, password } = body;

    const user = await User.findOne({ userName });

    const correctPass = user === null
    ? false
    : bcrypt.compare(password, user.passwordHash);

    if(!(user && correctPass)){
        response.status(401).json({
            error: 'Invalid user or password'
        });
    };

    const userToken = {
        userName: user.userName,
        id: user._id
    }

    const token = jwt.sign(
        userToken, 
        "" + process.env.SECRET,
        {
            expiresIn: 60 * 60 //Expira luego de 1 hora
        }
        );

    response.send({
        name: user.name,
        userName: user.userName,
        token
    });

});

module.exports = loginRouter;