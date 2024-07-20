import express from 'express';
import { Google, signOut, Signup } from '../controllers/auth.controller.js';
import {Signin} from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup",Signup);
router.post("/signin",Signin);
router.get('/signout', signOut);
router.post("/google", Google);


export default router;