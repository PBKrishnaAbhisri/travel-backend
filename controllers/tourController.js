import Tour from '../models/Tour.js';

// Create new tour
export const createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        
        res.status(201).json({
            success: true,
            message: "Successfully created tour",
            data: savedTour,
        });
    } catch (err) {
        console.error('Error creating tour:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to create tour"
        });
    }
};

// Update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    } catch (err) {
        console.error('Error updating tour:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to update tour"
        });
    }
};

// Delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted"
        });
    } catch (err) {
        console.error('Error deleting tour:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to delete tour"
        });
    }
};

// Get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Found tour",
            data: tour
        });
    } catch (err) {
        console.error('Error getting tour:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to get tour"
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
    // For pagination
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 8;
    
    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * limit)
            .limit(limit);

        const count = await Tour.countDocuments();

        res.status(200).json({
            success: true,
            count,
            message: "Successfully fetched tours",
            data: tours
        });
    } catch (err) {
        console.error('Error getting tours:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to get tours"
        });
    }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true })
            .populate('reviews')
            .limit(8);

        res.status(200).json({
            success: true,
            message: "Successfully fetched featured tours",
            data: tours
        });
    } catch (err) {
        console.error('Error getting featured tours:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to get featured tours"
        });
    }
};

// Get tour count
export const getTourCount = async (req, res) => {
    try {
        const count = await Tour.countDocuments();
        res.status(200).json({
            success: true,
            data: count
        });
    } catch (err) {
        console.error('Error getting tour count:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to get tour count"
        });
    }
};

// Search tours
export const getTourBySearch = async (req, res) => {
    const { city, distance, maxGroupSize } = req.query;
    
    try {
        const tours = await Tour.find({
            city: new RegExp(city, 'i'),
            distance: { $lte: distance || 9999999 },
            maxGroupSize: { $gte: maxGroupSize || 0 }
        }).populate('reviews');

        res.status(200).json({
            success: true,
            message: "Successfully found tours",
            data: tours
        });
    } catch (err) {
        console.error('Error searching tours:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Failed to search tours"
        });
    }
}; 