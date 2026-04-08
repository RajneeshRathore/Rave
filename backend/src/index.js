import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import friendRoute from './routes/friendship.route.js'
import messageRoute from './routes/message.route.js'
import channelRoute from './routes/channel.route.js'

const app = express();
app.set("trust proxy", 1); // Trust reverse proxy to allow secure cookies

app.use((req,res,next)=>{
    console.log("Request: ",req.method,req.url);
    next();
})

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://raven-ten-ochre.vercel.app", 
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use('/user',userRoute);
app.use('/auth',authRoute);
app.use('/friend',friendRoute);
app.use('/message',messageRoute);
app.use('/channel',channelRoute);

// Health check route for cloud deployment monitoring
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date(), message: 'Server is healthy and running' });
});

export default app;
