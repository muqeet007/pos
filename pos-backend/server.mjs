import { PORT } from "./config/config.mjs";
import express from 'express'
import cors from 'cors'
import { connectDatabase } from "./config/config.mjs";
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.mjs'
import productRoutes from './routes/product.routes.mjs';  
import orderRoutes from './routes/order.routes.mjs';  
import dashboardRoutes from './routes/dashboard.routes.mjs';
import receiptRoutes from './routes/receipt.routes.mjs';

const app=express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/orders', receiptRoutes);

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