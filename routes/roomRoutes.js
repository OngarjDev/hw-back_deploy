// routes/roomRoutes.js
import express from 'express';
import { addRoom, getAllRooms, getByIdRoom } from '../controller/roomController.js'; 

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
 *                   buildName:
 *                   type: string
 *                   example: "CB3"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */
router.get('/getall', getAllRooms);  // เปลี่ยนจาก .post เป็น .get

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
 *         description: สำเร็จ - เพิ่มห้องใหม่
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_name:
 *                   type: string
 *                   example: "2301"
 *                 buildName:
 *                   type: string
 *                   example: "CB3"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot add room"
 */
router.post('/add', addRoom); // ฟังก์ชันที่เพิ่มห้องใหม่

/**
 * @swagger
 * /api/rooms/getroomById/{id}:
 *   get: 
 *     tags:
 *       - Room Management
 *     summary: ค้นหาข้อมูลห้องด้วย ID
 *     parameters:
 *       - in: path
 *         name: id  # เปลี่ยนจาก
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: สำเร็จตรวจพบห้อง ตาม ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roomId:
 *                   type: integer
 *                   example: 3
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */
router.get('/getroomById/:id', getByIdRoom);

export default router;
