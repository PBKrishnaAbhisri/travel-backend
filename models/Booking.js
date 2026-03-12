import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
   {
      userId: {
         type: String
      },
      userEmail: {
         type: String
      },
      tourName: {
         type: String
      },
      packageTitle: {
         type: String
      },
      fullName: {
         type: String
      },
      guestSize: {
         type: Number
      },
      phone: {
         type: Number
      },
      bookAt: {
         type: Date
      },
      tourId: {
         type: mongoose.Types.ObjectId,
         ref: "Tour"
      },
      packageId: {
         type: mongoose.Types.ObjectId,
         ref: "Package"
      },
      price: {
         type: Number,
         required: true
      },
      duration: {
         type: String
      }
   },
   { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
