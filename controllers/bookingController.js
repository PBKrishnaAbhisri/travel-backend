import Booking from './../models/Booking.js'


// create new booking
export const createBooking = async(req, res) => {
    try {
        const userId = req.user.id;
        const newBooking = new Booking({
            ...req.body,
            userId: userId,
            bookingDate: new Date(),
            status: 'confirmed'
        });

        const savedBooking = await newBooking.save();

        // Populate user details
        const populatedBooking = await Booking.findById(savedBooking._id)
            .populate({
                path: 'userId',
                select: 'username email'
            })
            .populate({
                path: 'tourId',
                select: 'title city price'
            });

        res.status(200).json({
            success: true,
            message: "Your tour is booked!",
            data: populatedBooking
        });
    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal server error!"
        });
    }
};

// get single booking
export const getBooking = async(req,res) => {
   const id = req.params.id
   
   try {
      const book = await Booking.findById(id)

      res.status(200).json({success:true, message:"Successful!", data:book})
   } catch (error) {
      res.status(404).json({success:true, message:"Not Found!"})
   }
} 


// get all bookings for dashboard
export const getAllBooking = async(req, res) => {
    try {
        const books = await Booking.find()
            .populate('userId', 'username email')
            .populate('tourId', 'title city price')
            .sort({ createdAt: -1 });

        // Calculate statistics
        const totalBookings = books.length;
        const totalRevenue = books.reduce((sum, booking) => sum + (booking.price || 0), 0);
        const recentBookings = books.slice(0, 5);

        res.status(200).json({
            success: true,
            message: "Successfully fetched bookings",
            data: {
                totalBookings,
                totalRevenue,
                recentBookings,
                allBookings: books
            }
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
}; 