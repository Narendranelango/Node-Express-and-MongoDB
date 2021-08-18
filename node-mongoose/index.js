const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/MongoDB';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');
    Dishes.create({
        name: 'Szechuan Chicken Fried Rice',
        description: 'test1'
    })
    .then((dish) => {
        console.log(dish);
        console.log('Implemented Find By Id And Update');
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
        console.log('Implemented dish and comments');
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        console.log('Implemented Remove Dish');
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
    
});