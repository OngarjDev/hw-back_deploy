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

const getByIdRoom = async (req, res) => {
  try {
    const [rows] = await pool.promise().query(
      `SELECT * FROM helloworld_test.rooms WHERE roomId = ? LIMIT 1`, 
      [req.params.id] // ใช้ parameter binding แทนการต่อสาย string ด้วยตัวเองเพื่อป้องกัน SQL Injection
    );

    // ตรวจสอบหากไม่มีข้อมูลใน rows
    if (rows.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ส่งข้อมูลห้องที่ค้นพบ
    return res.status(200).json(rows[0]);  // ส่งข้อมูลห้องแค่ 1 รายการ
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRoom = async (req, res) => {
  try {
    const [rows] = await pool.promise().query(`Insert Into helloworld_test.rooms(roomName,bulidName) Values ('${req.query.roomName}','${req.query.bulidName}')`);
    return  res.status(200).json(rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
}
export {getAllRooms,getByIdRoom, addRoom}; 