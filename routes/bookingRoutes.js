import express from 'express';
import { getAllBooking,getByIdBookings, addBookings } from '../controller/bookingController.js';

const router = express.Router();

/**
 * @swagger
 * /api/bookings/getall:
 *   get:
 *     tags:
 *       - Bookings Management
 *     summary: ดึงรายการห้องทั้งหมด
*     parameters:
 *       - in: path
 *         name: id  # เปลี่ยนจาก
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
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
 *                   bookingId:
 *                     type: integer
 *                     example: 1
 *                   bookingName:
 *                     type: string
 *                     example: "สำหรับรายวิชา Network"
 *                   bookingDESC:
 *                     type: string
 *                     example: "เรียนจำนวน 1 หน่วยกิต อาจารย์ผู้สอน สหาย"
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T10:30:00Z"
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T14:30:00Z"
 *                   SType:
 *                     type: string
 *                     example: "Staff"
 *                   fk_room:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 *                 message:
 *                   type: string
 *                   example: "Cannot fetch room data"
 */
router.get('/getall', getAllBooking);

/**
 * @swagger
 * /api/bookings/getByIdBooking/{id}:
 *   get:
 *     tags:
 *       - Bookings Management
 *     summary: ดึงรายการห้อง เฉพาะID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: สำเร็จ - คืนรายการห้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookingId:
 *                     type: integer
 *                     example: 1
 *                   bookingName:
 *                     type: string
 *                     example: "สำหรับรายวิชา Network"
 *                   bookingDESC:
 *                     type: string
 *                     example: "เรียนจำนวน 1 หน่วยกิต อาจารย์ผู้สอน สหาย"
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T10:30:00Z"
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T14:30:00Z"
 *                   SType:
 *                     type: string
 *                     example: "Staff"
 *                   fk_room:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: เกิดข้อผิดพลาดใน server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 *                 message:
 *                   type: string
 *                   example: "Cannot fetch room data"
 */
router.get('/getByIdBooking/:id', getByIdBookings);

/**
 * @swagger
 * /api/bookings/add:
 *   post:
 *     tags:
 *       - Bookings Management
 *     summary: เพิ่มข้อมูลการจอง
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: integer
 *                 example: 1
 *               bookingName:
 *                 type: string
 *                 example: "สำหรับรายวิชา Network ทดสอบ only"
 *               bookingDESC:
 *                 type: string
 *                 example: "ทดสอบ เรียนจำนวน 1 หน่วยกิต อาจารย์ผู้สอน สหาย"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T11:30:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T13:30:00Z"
 *               SType:
 *                 type: string
 *                 example: "Staff 122"
 *               fk_room:
 *                 type: integer
 *                 example: 5
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
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 *                 message:
 *                   type: string
 *                   example: "Cannot fetch room data"
 */
router.post('/add', addBookings);


export default router;
