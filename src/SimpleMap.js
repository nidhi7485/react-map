import React, { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'

const SimpleMap = (props) => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const animateMarkers = () => {
      const initialLocations = [
        { lat: 25.594095, lng: 85.137566 }, // Patna
        { lat: 23.344101, lng: 85.309563 }, // Ranchi
        { lat: 28.70406, lng: 77.102493 }, // Delhi
        { lat: 26.846251, lng: 80.949028 }, // Lacknow
        { lat: 19.075983, lng: 72.877655 }, // Mumbai
        { lat: 19.075983, lng: 72.877655 }, // Indore
        { lat: 28.70406, lng: 77.102493 }, // Delhi
      ]

      const finalLocations = [
        { lat: 25.594095, lng: 85.137566 }, // Patna
        { lat: 23.344101, lng: 85.309563 }, // Ranchi
        { lat: 28.70406, lng: 77.102493 }, // Delhi
        { lat: 26.846251, lng: 80.949028 }, // Lacknow
        { lat: 19.075983, lng: 72.877655 }, // Mumbai
        { lat: 19.075983, lng: 72.877655 }, // Indore
        { lat: 28.70406, lng: 77.102493 }, // Delhi
      ]

      const interval = setInterval(() => {
        if (locations.length === finalLocations.length) {
          clearInterval(interval)
        } else {
          const updatedLocations = locations.map((location, index) => {
            const startLocation = initialLocations[index]
            const endLocation = finalLocations[index]
            const stepSize = 0.01

            const newLat =
              location.lat + stepSize * (endLocation.lat - startLocation.lat)
            const newLng =
              location.lng + stepSize * (endLocation.lng - startLocation.lng)

            return {
              lat: newLat,
              lng: newLng,
            }
          })

          setLocations(updatedLocations)
        }
      }, 1000)

      setLocations(initialLocations)
    }

    animateMarkers()
  }, [])

  const mapStyles = {
    width: '100%',
    height: '400px',
  }

  const renderMarkers = () => {
    return locations.map((location, index) => (
      <Marker key={index} position={location} animation={2} />
    ))
  }

  const renderPolylines = () => {
    return <Polyline path={locations} />
  }

  return (
    <Map
      google={props.google}
      zoom={10}
      style={mapStyles}
      initialCenter={{ lat: 25.594095, lng: 85.137566 }}
    >
      {renderMarkers()}
      {renderPolylines()}
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBpXycK9ndbOIivQ2yQf2MdqmogWPwwIV4',
})(SimpleMap)
