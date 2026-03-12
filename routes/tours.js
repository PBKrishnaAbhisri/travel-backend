import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'

import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// Public routes
router.get('/', getAllTour)
router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTour', getFeaturedTour)
router.get('/search/getTourCount', getTourCount)
router.get('/:id', getSingleTour)

// Protected routes (admin only)
router.post('/', verifyAdmin, createTour)
router.put('/:id', verifyAdmin, updateTour)
router.delete('/:id', verifyAdmin, deleteTour)

export default router