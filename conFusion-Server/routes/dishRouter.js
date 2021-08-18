const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());



dishRouter.route('/')
.all((req,res,next) => {        //app.get('/dishes', (req,res,next) => {(Previous One)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();//Points to the next '/' , i.e. to the next path.
})
.get((req,res,next) => {
    res.end('Dish Router Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

//Specifying to access the dish id path rather than creating a new .js file.
dishRouter.route('/:dishId')
.get((req,res)=>{
    res.end("Will send details of the dish: " + req.params.dishId +" to you!");
})
.post((req,res)=>{
    res.end("Post operation is not supported on /dishes"+req.url);
})
.put((req,res)=>{
    res.end("Updating the dish: "+req.params.dishId +"\nWill update the dish: " +req.body.name+ " with details: " + req.body.description);
})
.delete((req,res)=>{
    res.end("Deleting dish: " + req.params.dishId);
})

module.exports = dishRouter;