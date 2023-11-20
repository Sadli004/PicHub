const express = require('express');
require('dotenv').config({path: './Config/.env'});
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const userRoutes = require('./Routes/users.routes');
const postRoutes = require('./Routes/post.routes');
require('./Config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middlware');
const { uploadRoute } = require('./Controller/upload.controller');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieparser());

//jwt
app.get('*',checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  });
  
// routes 
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/user/upload',uploadRoute); // upload profile pic 

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
