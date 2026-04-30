import { Router } from "express";

import {
    addUser, deleteUser, getUser, getUsers, updateUser
} from '../controllers/user.controller.js'

import { isAdmin, verifyToken } from "../middlewares/verifyAuth.js";
import { authUser, mainUser } from "../controllers/auth.controller.js";

const rutas = Router()

rutas.post('/auth', authUser)
rutas.get('/main', [verifyToken], mainUser)

rutas.route('/user')
    .post(addUser)
    .get([verifyToken, isAdmin], getUsers)

rutas.route('/user/:id')
    .get([verifyToken], getUser)
    .put([verifyToken], updateUser)
    .delete([verifyToken], deleteUser)

export default rutas