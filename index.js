import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import packageRoute from './routes/packages.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

const allowedOrigins = [
   process.env.CLIENT_URL || 'http://localhost:3000',
   process.env.ADMIN_URL || 'http://localhost:3001'
];

const corsOptions = {
   origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connection failed:', error.message)
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// API routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/tours", tourRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/booking", bookingRoute)
app.use("/api/v1/packages", packageRoute)

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})