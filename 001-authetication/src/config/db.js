import mongoose from 'mongoose'

export async function connectionDB()
{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully");
}
export default connectionDB;