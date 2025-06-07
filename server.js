import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {Server} from 'socket.io';
import {createServer} from 'node:http';
import {v2 as cloudinary} from "cloudinary";
import {app} from "./socket/socket.js";
import roomsRoutes from "./routes/roomsRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import res from "express/lib/response.js";
import protectRoute from "./middlewares/protectRoute.js";
import {getUsersListForCorrespondence} from "./controllers/roomController.js";
import router from "./routes/roomsRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', // Порт Vite
    credentials: true,}));
app.use(express.json({limit: "50mb"})); // To parse JSON data in the req.body
app.use(express.urlencoded({extended: true})); // To parse form data in the req.body

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on('send_message', (msg) => {
        io.emit('message_from', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

// Routes

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/rooms", roomsRoutes);



server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
