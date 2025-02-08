import { pool } from "../index.js";

const getAllRooms = async (req, res) => {
    try {
      const [rows] = await pool.promise().query('SELECT * FROM helloworld_test.rooms');
      return res.status(200).json(rows);  // ส่งผลลัพธ์กลับไปในรูปแบบ JSON
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addRoom = async (req, res) => {
  try {
    const [rows] = await pool.promise().query(`Insert Into helloworld_test.rooms(roomName) Values ('${req.query.roomName}')`);
    return  res.status(200).json(rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
}
export {getAllRooms, addRoom}; 