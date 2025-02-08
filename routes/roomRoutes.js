import express from 'express';  // ทำการ import express
import getAllRooms from '../controller/roomController.js'; 

const router = express.Router();

router.get('/rooms', getAllRooms);  // เรียกใช้ฟังก์ชัน getAllRooms

export default router;