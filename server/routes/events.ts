import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router

// GET /events/add/friday
router.get('/add/:day', async (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))

  const locations = await db.getAllLocations()

  const viewData = { locations, days, day }
  res.render('addEvent', viewData)
})

// POST /events/add
router.post('/add', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    const location_id = Number(locationId)
    const newEvent = { name, description, time, location_id, day }
    await db.addNewEvent(newEvent)
    res.redirect(`/schedule/${day}`)
  } catch (err) {
    next(err)
  }
})

// POST /events/delete
router.post('/delete', async (req, res, next) => {
  try {
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)

    await db.deletEvent(id)

    res.redirect(`/schedule/${day}`)
  } catch (err) {
    next(err)
  }
})

// GET /events/3/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  const event = await db.getEventById(id)

  const locationsArr = await db.getAllLocations()
  //make the current location selected
  const locations = locationsArr.map((location) => ({
    id: location.id,
    name: location.name,
    selected: event.location_id === location.id ? 'selected' : '',
  }))

  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : '',
  }))

  const viewData = { event, locations, days }

  res.render('editEvent', viewData)
})

// POST /events/edit
router.post('/edit', async (req, res) => {
  const { name, description, time } = req.body
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)
  const location_id = Number(req.body.locationId)

  const updatedEvent = { id, name, description, day, time, location_id }

  await db.updateEvent(updatedEvent)

  res.redirect(`/schedule/${day}`)
})
