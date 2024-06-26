import express, { Router } from 'express'
import mongoose from 'mongoose';
import env from 'dotenv'
import userRouter from './Router/user.router.js';
import photoRouter from './Router/photo.router.js';
import storyRouter from './Router/story.router.js';
import cors from 'cors'

let corsAllow = {
    origin: "http://localhost:5173",
    methods: "PUT, GET, POST, PATCH, DELETE, HEAD",
    credentials: true
}

const app = express();


const dbConnection = () => {
    mongoose.connect(process.env.MONGO_STRING)
    .then(() => {
        console.log('DB is connected...');
    }).catch((err) => {
        console.log(err);
    })
}

env.config();
app.use(express.json());
app.use(cors(corsAllow));
app.use('/api/user', userRouter);
app.use('/api/photo', photoRouter);
app.use('/api/story', storyRouter);


app.listen(process.env.PORT, (err) =>{
    dbConnection();
    console.log(err?`${err}`:`server is live on ${process.env.PORT}`);
});