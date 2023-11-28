import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventForm } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

export const connection = knex(config)

export async function getAllLocations(): Promise<Location[]> {
  // TODO: use knex to get the real location data from the database

  return connection('locations').select('id', 'name', 'description')
}

export async function getEventsByDay(day: EventData['day']): Promise<Event[]> {
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
}

export async function getLocationById(id: Location['id']): Promise<Location> {
  return connection('locations')
    .where('id', id)
    .select('id', 'name', 'description')
    .first()
}

export async function updateLocation(
  updatedLocation: Location
): Promise<Location[]> {
  return connection('locations')
    .where('id', updatedLocation.id)
    .update(updatedLocation)
    .returning('*')
}

export async function addNewEvent(newEvent: EventForm): Promise<EventData[]> {
  return connection('events')
    .insert(newEvent)
    .returning([
      'location_id as locationId',
      'name',
      'day',
      'time',
      'description',
    ])
}

export async function deletEvent(id: Event['id']) {
  return connection('events').where({ id }).del()
}

export async function getEventById(id: Event['id']): Promise<Event> {
  return connection('events')
    .where('id', id)
    .select('location_id as locationId', 'name', 'day', 'time', 'description')
    .first()
}

export async function updateEvent(updatedEvent: Event): Promise<Event> {
  return connection('events').where('id', updatedEvent.id).update(updatedEvent)
}

export async function getAddLocation(newLocation: LocationData): Promise<Location> {
  return connection('locations').insert(newLocation)
}

export async function deleteLocation(id: number): Promise<Location> {
  return connection('locations')
    .where('id', id)

    .del()
}


