import express from 'express';
import { 
    createPackage, 
    getAllPackages, 
    updatePackage, 
    deletePackage 
} from '../controllers/packageController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Get all packages (public route)
router.get('/', getAllPackages);

// Create new package (protected route)
router.post('/', verifyAdmin, createPackage);

// Update package (protected route)
router.put('/:id', verifyAdmin, updatePackage);

// Delete package (protected route)
router.delete('/:id', verifyAdmin, deletePackage);

export default router; 