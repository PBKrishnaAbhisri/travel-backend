import Package from '../models/Package.js';

// Get all packages
export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            message: "Successfully fetched packages",
            data: packages
        });
    } catch (err) {
        console.error('Error fetching packages:', err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch packages"
        });
    }
};

// Create new package
export const createPackage = async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        const savedPackage = await newPackage.save();
        
        res.status(201).json({
            success: true,
            message: "Successfully created package",
            data: savedPackage,
        });
    } catch (err) {
        console.error('Error creating package:', err);
        res.status(500).json({
            success: false,
            message: "Failed to create package"
        });
    }
};

// Update package
export const updatePackage = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedPackage,
        });
    } catch (err) {
        console.error('Error updating package:', err);
        res.status(500).json({
            success: false,
            message: "Failed to update package"
        });
    }
};

// Delete package
export const deletePackage = async (req, res) => {
    const id = req.params.id;
    try {
        await Package.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "Successfully deleted"
        });
    } catch (err) {
        console.error('Error deleting package:', err);
        res.status(500).json({
            success: false,
            message: "Failed to delete package"
        });
    }
}; 