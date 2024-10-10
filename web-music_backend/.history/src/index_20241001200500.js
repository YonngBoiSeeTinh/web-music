const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Nạp biến môi trường từ .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors({
    origin: '*', // Chỉ định URL frontend hoặc để '*' nếu bạn muốn cho phép từ mọi nguồn
}));
app.use(cookieParser())
app.use(bodyParser.json())

routes(app);

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log('DB connect success');
    })
    .catch((err) => {
        console.log(err);
    });
    
app.listen(port, () =>{
    console.log('Server is running in port',+port)
});