import express from 'express';  // ทำการ import express
import { addRoom, getAllRooms } from '../controller/roomController.js'; 

const router = express.Router();

/**
 * @swagger
 * /api/rooms/getall:
 *   get:
 *     tags:
 *       - Room Management 
 *     summary: ดึงรายการห้องทั้งหมด
 *     responses:
 *       200:
 *         description: สำเร็จ - คืนรายการห้องทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room_name:
 *                     type: string
 *                     example: "2301"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 * 
 * 
 */
router.get('/getall', getAllRooms);  // เรียกใช้ฟังก์ชัน getAllRooms
/**
 * @swagger
 * /api/rooms/add:
 *   post:
 *     tags:
 *       - Room Management
 *     summary: เพิ่มข้อมูลห้องทั้งหมด
 *     parameters:
 *       - in: query
 *         name: roomName
 *         required: true
 *         schema:
 *           type: string
 *           example: "Lx12-2"
 *     responses:
 *       200:
 *         description: สำเร็จ - คืนรายการห้องทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room_name:
 *                     type: string
 *                     example: "2301"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */

router.post('/add', getAllRooms)


/**
 * @swagger
 * /api/rooms/add:
 *   post:
 *     tags:
 *       - Room Management
 *     summary: เพิ่มข้อมูลห้องทั้งหมด
 *     parameters:
 *       - in: query
 *         name: roomName
 *         required: true
 *         schema:
 *           type: string
 *           example: "Lx12-2"
 *     responses:
 *       200:
 *         description: สำเร็จ - คืนรายการห้องทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room_name:
 *                     type: string
 *                     example: "2301"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */

router.post('/add', addRoom)
export default router;