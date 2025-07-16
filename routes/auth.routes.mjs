import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.mjs';
import { protect, adminOnly } from '../middlewares/auth.middleware.mjs';
import { User } from '../models/User.mjs';
const router = express.Router();

// Only admin can register staff
router.post('/register', protect, adminOnly, registerUser);
router.post('/login', loginUser);


// The route mentioned below is used for creating an admin manually

// router.post('/bootstrap-admin', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const adminExists = await User.findOne({ email });
//     if (adminExists) return res.status(400).json({ message: "Admin already exists" });

//     const admin = await User.create({ name, email, password, role: 'admin' });
//     res.status(201).json({ message: "Admin created", admin });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
