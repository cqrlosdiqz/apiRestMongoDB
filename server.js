const express = require('express');
require('dotenv').config();

const server = express();

//Configuration
const port = process.env.PORT || 8080;

//Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Router
server.use('/characters', require('./router/characters.routes'));

//404
server.use('*',(req,res)=>{
    res.status(404).send('<h1>Not Found</h1>');
})
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
