import mongoose from 'mongoose';

mongoose.set('strictQuery',false);

const connectionToDB = async() => {
    try {
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://localhost:27017/LMS_db'
        );
    
        if(connection){
            console.log(`Connection to MongoDB : ${connection.host}`);
        }
    }
   catch(e){
        console.log(e);
        process.exit(1);
   }

}

export default connectionToDB;