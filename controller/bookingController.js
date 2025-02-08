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
    const [rows] = await pool.promise().query(`Insert Into helloworld_test.bookings(startTime,endTime,SType,fk_room) Values (${req.param.starttime},${req.param.endtime},${req.param.SType},'${req.param.id}')`);
    return  res.status(200).json(rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
}
export {getAllBooking, addBookings}; 