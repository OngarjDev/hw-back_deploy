import express from 'express';
import { getAllBooking, addBookings } from '../controller/bookingController.js';

const router = express.Router();

/**
 * @swagger
 * /api/bookings/getall:
 *   get:
 *     tags:
 *       - bookings Management 
 *     summary: ดึงรายการจองทั้งหมด
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


/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     tags:
 *       - Booking Management
 *     summary: Get booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: integer
 *                   example: 1
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T10:30:00Z"
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T14:30:00Z"
 *                 building:
 *                   type: object
 *                   properties:
 *                     buildingId:
 *                       type: integer
 *                       example: 101
 *                     buildingName:
 *                       type: string
 *                       example: "Building A"
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bookings not found"
 *       500:
 *         description: Server error
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
 *                   example: "Cannot fetch booking data"
 */
router.get('/:id', async (req, res) => {
    // Code for getting booking by ID
  });

  /**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags:
 *       - Booking Management
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildings_buildingId:
 *                 type: integer
 *                 example: 101
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T10:30:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T14:30:00Z"
 *     responses:
 *       201:
 *         description: Successfully created booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: integer
 *                   example: 1
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T10:30:00Z"
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T14:30:00Z"
 *       409:
 *         description: Conflict - Room not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Room not available"
 *       500:
 *         description: Server error
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
 *                   example: "Cannot create booking"
 */
router.post('/', async (req, res) => {
    // Code for creating booking
  });

  /**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     tags:
 *       - Booking Management
 *     summary: Update a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildings_buildingId:
 *                 type: integer
 *                 example: 101
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T10:30:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T14:30:00Z"
 *     responses:
 *       200:
 *         description: Successfully updated booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: integer
 *                   example: 1
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T10:30:00Z"
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T14:30:00Z"
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 */
router.put('/:id', async (req, res) => {
    // Code for updating booking
  });

  /**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags:
 *       - Booking Management
 *     summary: Delete a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Successfully deleted booking
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
    // Code for deleting booking
  });
  
export default router;
