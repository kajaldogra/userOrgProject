import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import connectDB from './config/db'
import userRouter from './route/user_route'
import organisationRouter from './route/organisation_route'


const app = express();
const PORT = process.env.PORT || 3000
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/user',userRouter)
app.use('/api/organisation',organisationRouter)

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
}); 