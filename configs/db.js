import mongoose from 'mongoose';
const dbConfig = async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/board', {
            useNewUrlParser: true,
            useUnifiedTogplogy: true,
        })
        console.log("Database connected successfully");
    } catch(e) {
        console.error("Database connection error:", e);
        process.exit(1);
    }
}

export default dbConfig;