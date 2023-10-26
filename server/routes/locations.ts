import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()

    const viewData = { locations }

    res.render('showLocations', viewData)
  } catch (e) {
    next(e)
  }
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const viewData = await db.getLocationById(id)
    console.log(viewData)
    res.render('editLocation', viewData)
  } catch (e) {
    next(e)
  }
})

// POST /locations/edit
router.post('/edit', async (req, res, next) => {
  try {
    const { id, name, description } = req.body

    const updatedLocation = { id, name, description }

    await db.updateLocation(updatedLocation)

    res.redirect('/locations')
  } catch (e) {
    next(e)
  }
})

router.get('/add', async (req, res, next) => {
  try {
    res.render('addLocation')
  } catch (e) {
    next(e)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { name, description } = req.body
    const location = { name, description }
    await db.getAddLocation(location)
    res.redirect('/locations')
  } catch (e) {
    next(e)
  }
})

router.post('/delete', async (req, res, next) => {
  try {
    const id = Number(req.body.id)
    console.log(id)
    const result = await db.deleteLocation(id)
    console.log(result)
    res.redirect('/locations')
  } catch (e) {
    next(e)
  }
})

export default router
