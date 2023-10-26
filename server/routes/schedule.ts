import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET /schedule/friday
router.get('/:day', async (req, res,next) => {
  try{

    const day = validateDay(req.params.day)
  
    const viewData = {
      day: day,
      events: await db.getEventsByDay(day),
    }
  
    res.render('showDay', viewData)
  }catch (e) {
    next(e)
  }
})

export default router
