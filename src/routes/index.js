import { Router } from "express";

import user from "./users.routes.js";
import post from "./posts.routes.js";

const router = Router()

router.use('/api', user, post)

router.use('/*not_found', (req, res) => {
    return res.status(404).json({ message: 'Resource not found' });
})

export default router