import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes.js';
// import buildingRoutes from '/routes/buildingRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
const os = await import("os");
import mysql from 'mysql2';


dotenv.config();
// เชื่อมต่อกับฐานข้อมูล MySQL
export const pool = mysql.createPool({
  host: process.env.DATABASE_URL,
  user:  process.env.MYSQL_USER,             // ชื่อผู้ใช้ฐานข้อมูล
  password: process.env.MYSQL_PASSWORD,             // รหัสผ่านฐานข้อมูล
  database: process.env.MYSQL_DATABASE,        // ชื่อฐานข้อมูลที่ใช้
  // waitForConnections: true,
  port: process.env.PORT
});

// ทดสอบการเชื่อมต่อฐานข้อมูล
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database!');
    connection.release();  // ปล่อยการเชื่อมต่อหลังทดสอบเสร็จ
  }
});


const hostname = os.default.hostname();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
app.use('/api/bookings', bookingRoutes);
// app.use('/api/buildings', buildingRoutes);
app.use('/api/rooms', roomRoutes);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORTServer; 

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://${hostname}:${PORT}/health`);
  console.log(`API DOCS at http://${hostname}:${PORT}/api-docs`);
});

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

