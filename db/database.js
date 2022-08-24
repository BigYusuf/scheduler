
const mongoose = require("mongoose")// connecting to my mongo server
const dotenv = require('dotenv');

//setting up config file
dotenv.config();

const connectionString= process.env.MONGO_URL
const connectDatabase = () => {
    
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((con)=> {
      //  console.log(`DB Connection Successful to HOST: ${con.connection.host}`)
        console.log(`Database Connected`)
    })
    .catch((err) => console.log(err))
}
module.exports = connectDatabase;