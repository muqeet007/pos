import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()

export const PORT=process.env.PORT
export const MONGO_URL=process.env.MONGO_URL
export const JWT_SECRET=process.env.JWT_SECRET

export const connectDatabase=()=>{mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
})
  .catch(error => {
    console.log(`Error: ${error.message}`);
    process.exit(1)
  })
}