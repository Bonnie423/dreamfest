import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const connection = knex(config)

export async function getAllLocations(): Promise<Location[]> {
  // TODO: use knex to get the real location data from the database
  try {
    return connection('locations').select('*')
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getEventsByDay(day: EventData['day']): Promise<Event[]> {
  try {
    return connection('events')
      .join('locations', 'locations.id', 'events.location_id')
      .where('events.day', day)
      .select(
        'events.id as id',
        'day',
        'events.name as eventName',
        'locations.name as locationName',
        'events.description as description ',
        'time'
      )
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getLocationById(id: Location['id']): Promise<Location> {
  try {
    return connection('locations').where('id', id).select('*').first()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function updateLocation(
  updatedLocation: Location
): Promise<Location[]> {
  try {
    return connection('locations')
      .where('id', updatedLocation.id)
      .update(updatedLocation)
      .returning('*')
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function addNewEvent(newEvent: Event): Promise<EventData[]> {
  try {
    return connection('events').insert(newEvent).returning('*')
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function deletEvent(id: Event['id']) {
  try {
    return connection('events').where({ id }).del()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getEventById(id: Event['id']): Promise<Event> {
  try {
    return connection('events').where('id', id).select('*').first()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function updateEvent(updatedEvent: Event): Promise<Event> {
  try {
    return connection('events')
      .where('id', updatedEvent.id)
      .update(updatedEvent)
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getAddLocation(newLocation: Location): Promise<Location> {
  try {
    return connection('locations').insert(newLocation)
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function deleteLocation(id: number): Promise<Location> {
  try {
    return connection('locations')
      .where('id', id)

      .del()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

// TODO: write some more database functions
