const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const  employeeRoutes = require("./Routes/employeeRoutes")
const { errorHandler, notFound } = require('./Middleware/errormiddleWare');
const app = express();
dotenv.config()
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000

app.use('/api/employee' , employeeRoutes );

app.use(notFound)
app.use(errorHandler)


app.listen(PORT , console.log(`Server running on port ${PORT}`));


