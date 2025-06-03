import express from "express";
import { 
    addUser, 
    updateUser, 
    loginHandler, 
    logout, 
    deleteUser, 
    getUserById,
    getUsers
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// Route baru untuk refresh token, tidak butuh verifyToken karena tujuan dia untuk dapat token baru
router.get("/token", refreshToken);

//endpoint authenticate
router.post('/login', loginHandler);
router.delete('/logout', logout);
router.post('/register', addUser);

//endpoint khusus verify token
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUserById);
router.delete('/delete-user/:id', verifyToken, deleteUser);
router.put('/update-user/:id', verifyToken, updateUser);


export default router;
