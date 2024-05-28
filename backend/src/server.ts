import express, { Request, Response, NextFunction, Errback } from 'express';
import moviesRouter from './routes/movies';
import userAuth from './auth/user'
import cors from "cors";
import "express-async-errors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

//API
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(cors(
//     {
//         origin : "http://localhost:5173",
//         credentials : true,
//     }
// ))


app.use(express.json());

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle CORS
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true,               // Include credentials (cookies) in requests
}));

app.use((req, res, next) => {
    console.log('Cookies:', req.cookies);
    next();
});
//Middleware 

app.get("/", (request: Request, response: Response) => {
    response.send("hello ts")
})

app.use("/api/movies", moviesRouter);
app.use("/authenticate", userAuth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})



