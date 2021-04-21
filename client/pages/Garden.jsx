import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'

import Map from '../components/Map'
import Events from '../components/Events'
import { getGarden, signedIn } from './gardenHelper'

function Garden () {
  const garden = useSelector(globalState => globalState.garden)

  if (!signedIn()) return <Redirect to={'/signin'} />

  useEffect(() => {
    getGarden()
  }, [])

  const { name, description, address, url, events, lat, lon } = garden
  return (
    <>
      <div className="column garden">
        <h2>{name}</h2>
        <p className="mb-4">{description} </p>
        <p><a className="gardenLink word-wrap" href={url}>{url}</a></p>
        <Events events={events} />
      </div>
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        addresses={[address]}
      />
    </>
  )
}

export default Garden
