import { Router } from "express";

import multer from '../middlewares/uploadFile.js'

import {
    addPost, deletePost, getPost, getPosts, updatePost
} from '../controllers/post.controller.js';

import { verifyToken } from "../middlewares/verifyAuth.js";
import { isPostOwner } from "../middlewares/verifyPost.js";

const rutas = Router()

rutas.route('/post')
    .post([verifyToken], [multer], addPost)
    .get([verifyToken], getPosts)

rutas.route('/post/:id')
    .get([verifyToken, isPostOwner], getPost)
    .put([verifyToken, isPostOwner], [multer], updatePost)
    .delete([verifyToken, isPostOwner], deletePost)

rutas.get('/posts', getPosts)

export default rutas