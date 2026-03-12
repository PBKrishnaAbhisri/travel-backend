import express from 'express'
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// Create booking (any authenticated user can create)
router.post('/create', verifyUser, createBooking)

// Get single booking
router.get('/:id', verifyUser, getBooking)

// Get all bookings (admin only)
router.get('/', verifyAdmin, getAllBooking)

export default router