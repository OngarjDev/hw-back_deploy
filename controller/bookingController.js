import { pool } from "../index.js";

const getAllBooking = async (req, res) => {
    try {
      const [rows] = await pool.promise().query('SELECT * FROM helloworld_test.bookings');
      return res.status(200).json(rows);  // ส่งผลลัพธ์กลับไปในรูปแบบ JSON
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getByIdBookings = async (req, res) => {
  try {
    const [rows] = await pool.promise().query(
      `SELECT * FROM helloworld_test.bookings WHERE bookingId = ? LIMIT 1`,  // เปลี่ยนจาก helloworld_test.bookings เป็น bookingId
      [parseInt(req.params.id)]  // ใช้ parameter binding แทนการต่อสาย string ด้วยตัวเองเพื่อป้องกัน SQL Injection
    );

    // ตรวจสอบหากไม่มีข้อมูลใน rows
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });  // เปลี่ยนจาก "Room not found" เป็น "Booking not found"
    }

    // ส่งข้อมูลการจองที่ค้นพบ
    return res.status(200).json(rows[0]);  // ส่งข้อมูลการจองแค่ 1 รายการ
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addBookings = async (req, res) => {
  try {
    let { startTime, endTime, SType, fk_room , bookingName,bookingDESC} = req.body;

    // แปลง ISO 8601 -> รูปแบบที่ MySQL รองรับ
    startTime = new Date(startTime).toISOString().slice(0, 19).replace("T", " ");
    endTime = new Date(endTime).toISOString().slice(0, 19).replace("T", " ");

    const query = `
      INSERT INTO helloworld_test.bookings (startTime, endTime, SType, fk_room,bookingName,bookingDESC) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [rows] = await pool.promise().query(query, [startTime, endTime, SType, fk_room,bookingName,bookingDESC]);

    return res.status(200).json({ message: "Booking added successfully", rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export {getAllBooking,getByIdBookings, addBookings}; 