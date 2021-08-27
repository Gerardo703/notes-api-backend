const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.post('/', async(request, response, next) => {
    try {
        const { body } = request;
        const { userName, name, password } = body;

        //Hashear Password
        const saltRound = 10;
        const passwordHash = await bcrypt.hash(password, saltRound);

        const user = new User({
            userName,
            name,
            passwordHash
        });

        const savedUser = await user.save();
        response.status(200).json(savedUser);

    } catch (error) {
        next(error);
    }
     
});

usersRouter.delete('/:id', async(request, response, next) => {
    try{
        const { id } = request.params;

        const deletedUser = await User.findByIdAndDelete(id)
        response.status(204).json(deletedUser);

    }catch(error){
        next(error);
    }
    
});

usersRouter.get('/', async(request, response, next) => {

    try {
        const allUsers = await User.find();
        response.json(allUsers);

    } catch (error) {
        next(error);
    }
    
});

usersRouter.get('/:id', async(request, response, next) => {
    try {
        const { id } = request.params;
        const userFind = await User.findById(id);
        response.json(userFind);

    } catch (error) {
        next(error);
    }
});

usersRouter.put('/:id', async(request, response, next) => {

    try {
        const { id } = request.params;
        const user = request.body;

        const userInfo = {
            name: user.name,
            userName: user.userName,
            password: user.passwordHash
        };

        const userEdited = await User.findByIdAndUpdate(id, userInfo, { new: true } )
        response.json(userEdited);

    } catch (error) {
        next(error);
    }
    
})

module.exports = usersRouter;