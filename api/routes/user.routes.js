import express from 'express';
import { updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser } from '../controllers/user.controllers.js';
import { getUserListings } from '../controllers/user.controllers.js';
import { getUser } from '../controllers/user.controllers.js';
const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;