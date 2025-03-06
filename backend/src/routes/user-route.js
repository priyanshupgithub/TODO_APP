import express from "express"
import { login, logout, register, update } from '../controller/user-controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update/:id',update);

export default router