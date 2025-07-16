import { PORT } from "./config/config.mjs";
import express from 'express'
import cors from 'cors'
import { connectDatabase } from "./config/config.mjs";
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.mjs'

const app=express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/auth', authRoutes);


// Testing
// app.get("/", (req, res) => {
//   res.send("POS Backend Running");
// });

const startServer = async () => {
  await connectDatabase()
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}
  
startServer()