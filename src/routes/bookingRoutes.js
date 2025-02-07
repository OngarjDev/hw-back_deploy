import express from 'express';
import { PrismaClient } from '@prisma/client';

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       409:
 *         description: Room is not available
 * 
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */

const router = express.Router();
const prisma = new PrismaClient();

// check room is available
const isRoomAvailable = async (buildings_buildingId, startTime, endTime, excludeBookingId = null) => {
  const rooms = await prisma.rooms.findFirst({
    where: {
      buildings_buildingId: buildings_buildingId,
    }
  });

  if (!rooms || rooms.roomStatus !== 'AVAILABLE') {
    return {
      available: false,
      message: rooms ? 'Room is currently unavailable or under maintenance' : 'Room not found'
    };
  }

  //check existing bookings
  const existingBooking = await prisma.bookings.findFirst({
    where: {
      buildings_buildingId: buildings_buildingId,
      AND: [
        {
          startTime: {
            lte: new Date(endTime)
          }
        },
        {
          endTime: {
            gte: new Date(startTime)
          }
        },
        {
          bookingId: {
            not: excludeBookingId
          }
        }
      ]
    }
  });

  return {
    available: !existingBookings,
    message: existingBookings ? 'Room is already booked for this time period' : null
  };
};

//Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.bookings.findMany({
      include: {
        buildings: true
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking by id
router.get('/:id', async (req, res) => {
  try {
    const bookings = await prisma.bookings.findUnique({
      where: { bookingId: req.params.id },
      include: {
        building: true
      }
    });
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const { buildings_buildingId, startTime, endTime } = req.body;

    const availabilityCheck = await isRoomAvailable(buildings_buildingId, startTime, endTime);
    
    if (!availabilityCheck.available) {
      return res.status(409).json({ 
        error: availabilityCheck.message 
      });
    }

    const bookings = await prisma.bookings.create({
      data: {
        ...req.body,
        lastUpdate: new Date()
      }
    });
    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const { buildings_buildingId, startTime, endTime } = req.body;

    const availabilityCheck = await isRoomAvailable(
      buildings_buildingId, 
      startTime, 
      endTime, 
      req.params.id
    );
    
    if (!availabilityCheck.available) {
      return res.status(409).json({ 
        error: availabilityCheck.message 
      });
    }

    const bookings = await prisma.bookings.update({
      where: { bookingId: req.params.id },
      data: {
        ...req.body,
        lastUpdate: new Date()
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    await prisma.bookings.delete({
      where: { bookingId: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;