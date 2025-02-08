
// const express = require("express");
// const router = express.Router();
// const roomController = require("../controller/.js");
// const bookingController = require("../controller/BookingController.js");

/**
 * @swagger
 * /rooms:
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
 *                   room_id:
 *                     type: integer
 *                     example: 1
 *                   building_name:
 *                     type: string
 *                     example: "CB2"
 *                   room_name:
 *                     type: string
 *                     example: "2301"
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch room data"
 */
router.get("/rooms", roomController.getAllRooms);

/**
 * @swagger
 * /booking:
 *   post:
 *     tags:
 *       - Room Management 
 *     summary: เพิ่มการจองใหม่
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booked_by_name:
 *                 type: string
 *                 example: "Thanaphat"
 *               room_id:
 *                 type: integer
 *                 example: 1
 *               booking_by_status:
 *                 type: string
 *                 example: "student"
 *               booking_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-02-10T12:00:00Z"
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-02-10T14:00:00Z"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-02-10T16:00:00Z"
 *     responses:
 *       201:
 *         description: การจองสำเร็จ
 *         content:
 *           application/json:
 *             example:
 *               message: "Booking created successfully"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 *               message: "All fields are required: booked_by_name, room_id, booking_by_status, booking_date, start_time, end_time."
 *       500:
 *         description: ข้อผิดพลาดฐานข้อมูล
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot insert booking data"
 */
router.post("/booking", bookingController.addBooking);

/**
 * @swagger
 * /GetBookingByName/{booked_by_name}: 
 *   get:
 *     tags:
 *       - Room Management 
 *     summary: ดึงการจองจากชื่อผู้จอง
 *     parameters:
 *       - in: path
 *         name: booked_by_name
 *         required: true
 *         schema:
 *           type: string
 *           example: "Thanaphat"
 *     responses:
 *       200:
 *         description: พบข้อมูลการจอง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booked_by_name:
 *                   type: string
 *                   example: "Thanaphat"
 *                 room_id:
 *                   type: integer
 *                   example: 1
 *                 booking_by_status:
 *                   type: string
 *                   example: "Student"
 *                 booking_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-04T17:00:00.000Z"
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-05T02:00:00.000Z"
 *                 end_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-05T04:00:00.000Z"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 *               message: "booked_by_name is required."
 *       404:
 *         description: ไม่พบข้อมูลการจอง
 *         content:
 *           application/json:
 *             example:
 *               error: "Not found"
 *               message: "No bookings found for this name."
 *       500:
 *         description: ข้อผิดพลาดฐานข้อมูล
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot fetch booking data"
 */
router.get('/GetBookingByName/:booked_by_name', bookingController.getBookingByname);

/**
 * @swagger
 * /deleteBooking/{bookingId}:
 *   delete:
 *     tags:
 *       - Room Management 
 *     summary: ลบการจองตาม ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของการจองที่ต้องการลบ
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *         content:
 *           application/json:
 *             example:
 *               message: "Delete Success"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 *               message: "bookingId must be an integer."
 *       404:
 *         description: ไม่พบข้อมูล
 *         content:
 *           application/json:
 *             example:
 *               error: "Not found"
 *               message: "No booking found with this ID."
 *       500:
 *         description: ข้อผิดพลาดฐานข้อมูล
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 *               message: "Cannot delete booking"
 */
router.delete('/deleteBooking/:bookingId', bookingController.deleteBooking);

/**
 * @swagger
 * /api/bookings/{bookingId}:
 *   put:
 *     tags:
 *       - Room Management 
 *     summary: อัปเดตการจองห้องประชุม
 *     description: ใช้เพื่ออัปเดตข้อมูลการจองห้อง Booking ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: รหัสการจองที่ต้องการอัปเดต
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booked_by_name
 *               - room_id
 *               - booking_by_status
 *               - booking_date
 *               - start_time
 *               - end_time
 *             properties:
 *               booked_by_name:
 *                 type: string
 *                 example: "Thanaphat"
 *               room_id:
 *                 type: integer
 *                 example: 101
 *               booking_by_status:
 *                 type: string
 *                 example: "student"
 *               booking_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-07"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "09:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "11:00"
 *     responses:
 *       200:
 *         description: อัปเดตข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update Success"
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: มีปัญหาในการอัปเดตฐานข้อมูล
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cannot update database"
 */
router.patch('/updateBooking/:bookingId',bookingController.updateBook);
/**
 * @swagger
 * /getAllBooking:
 *   get:
 *     tags:
 *       - Room Management 
 *     summary: ดึงรายการการจองทั้งหมด
 *     description: ใช้สำหรับดึงข้อมูลการจองทั้งหมด
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   booking_id:
 *                     type: integer
 *                     example: 1
 *                   booked_by_name:
 *                     type: string
 *                     example: "Thanaphat"
 *                   room_id:
 *                     type: integer
 *                     example: 101
 *                   booking_by_status:
 *                     type: string
 *                     example: "student"
 *                   booking_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-07"
 *                   start_time:
 *                     type: string
 *                     format: time
 *                     example: "09:00"
 *                   end_time:
 *                     type: string
 *                     format: time
 *                     example: "11:00"
 *       500:
 *         description: ข้อผิดพลาดฐานข้อมูล
 *         content:
 *           application/json:
 *             example:
 *               error: "Database error"
 */
router.get('/getAllBooking', bookingController.getAllBooking);
module.exports = router;
