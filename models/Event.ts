export interface EventData {
  locationId: number
  day: string
  time: string
  name: string
  description: string
}

export interface EventWithLocation {
  id: number
  locationName: string
  eventName: string
  day: string
  time: string
  description: string
}

export interface Event extends EventForm {
  id: number
}

export interface EventForm{
  location_id: number
  day: string
  time: string
  name: string
  description: string
}
