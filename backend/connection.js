const mongoose = require('mongoose');

const url ="mongodb+srv://ShivamGT:shivam7531@shivamgt.liwv0.mongodb.net/mydatabse?retryWrites=true&w=majority&appName=ShivamGT"

// connect to the database

//asynchronous - returns a promise
mongoose.connect(url)
.then((result) => {
    console.log('connected to databse');
    
    
})
.catch((err) => {
    console.log(err);
    
    
});

module.exports=mongoose;
