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

const addBookings = async (req, res) => {
  try {
    let { startTime, endTime, SType, fk_room } = req.body;

    // แปลง ISO 8601 -> รูปแบบที่ MySQL รองรับ
    startTime = new Date(startTime).toISOString().slice(0, 19).replace("T", " ");
    endTime = new Date(endTime).toISOString().slice(0, 19).replace("T", " ");

    const query = `
      INSERT INTO helloworld_test.bookings (startTime, endTime, SType, fk_room) 
      VALUES (?, ?, ?, ?)
    `;

    const [rows] = await pool.promise().query(query, [startTime, endTime, SType, fk_room]);

    return res.status(200).json({ message: "Booking added successfully", rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export {getAllBooking, addBookings}; 