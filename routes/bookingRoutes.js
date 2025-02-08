import express from 'express';
import { getAllBooking, addBookings } from '../controller/bookingController.js';

const router = express.Router();

/**
 * @swagger
 * /api/bookings/getall:
 *   get:
 *     tags:
 *       - bookings Management 
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
 */
router.get('/getall', getAllBooking);

/**
 * @swagger
 * /api/bookings/add:
 *   post:
 *     tags:
 *       - bookings Management 
 *     summary: เพิ่มข้อมูลการจอง
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 example: "Lx12-2"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T10:30:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T14:30:00Z"
 *               SType:
 *                 type: string
 *                 example: "Staff"
 *               fk_room:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: สำเร็จสามารถเพิ่มข้อมูลได้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking added successfully"
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */
router.post('/add', addBookings);

export default router;
