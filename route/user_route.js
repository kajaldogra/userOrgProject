import express from 'express'
const userRouter = express.Router();
import {userRegister,updateUser,userList,getUserById} from '../controller/user_controller'

userRouter.post('/add',userRegister)
userRouter.put('/edit/:id',updateUser)
userRouter.get('/list/:id',userList)
userRouter.get('/:id',getUserById)


export default userRouter