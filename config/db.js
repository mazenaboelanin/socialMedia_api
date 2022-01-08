const mongoose = require('mongoose');


exports.dbConnection = async()=>{

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected...');
    
} 


