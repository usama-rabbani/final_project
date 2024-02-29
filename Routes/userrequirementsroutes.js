import express from "express";

import {userrequirements} from '../controller/userrequirementscontroller.js'
import fs from 'fs'
const router = express.Router()
router.post("/userreq", userrequirements);

export default router