const getAllRooms = async (req, res) => {
    try {
      const [rows, fields] = promisePool.execute(
        'Insert into `rooms` SET `roomName` = ?', 
      );
      return rows[0];  // คืนค่าผู้ใช้คนเดียว
    } catch (error) {
      throw error;
    }
}
export default getAllRooms; 