const express = require("express")
const connectToDb = require('./connectDb')
const mongoose = require("mongoose")
const router = require('./routes/route')
const staticRouter = require('./routes/staticRoute')
const userRoute = require('./routes/users')
const URL = require('./models/urlmodel')
require("dotenv").config();
const path = require('path')
const cookieParser = require('cookie-parser')
const { checkForAuthentication, restrictTo } = require('./middleware/authmiddleware')
const authRoute = require('./routes/authRoute')





const app = express();
const PORT = process.env.PORT || 5678;

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectToDb(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB setup completed");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err.message);
  });


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(checkForAuthentication);

app.use('/', staticRouter)
app.use('/url', restrictTo(["NORMAL", "ADMIN"]), router)
app.use('/user', userRoute)
app.use('/auth', authRoute);


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

