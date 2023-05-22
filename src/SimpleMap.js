import React, { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'

const SimpleMap = (props) => {
  const [markerPositions, setMarkerPositions] = useState([])
  const [polylinePath, setPolylinePath] = useState([])

  useEffect(() => {
    const positions = [
      { lat: 25.594095, lng: 85.137566 }, // Patna
      { lat: 23.344101, lng: 85.309563 }, // Ranchi
      { lat: 28.70406, lng: 77.102493 }, // Delhi
      { lat: 26.846251, lng: 80.949028 }, // Lacknow
      { lat: 19.075983, lng: 72.877655 }, // Mumbai
      { lat: 19.075983, lng: 72.877655 }, // Indore
      { lat: 28.70406, lng: 77.102493 }, // Delhi
    ]

    setMarkerPositions(positions)

    setPolylinePath(positions)
  }, [])

  const animateMarkers = () => {
    const interval = setInterval(() => {
      if (markerPositions.length < 2) {
        clearInterval(interval)
        return
      }

      const newPositions = [...markerPositions]
      const newPosition = newPositions.shift()
      setMarkerPositions(newPositions)

      setPolylinePath(newPositions)

      newPositions.push(newPosition)
      setMarkerPositions(newPositions)
    }, 1000)
  }
  return (
    <Map
      google={props.google}
      zoom={14}
      style={{ width: '100%', height: '400px' }}
      initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Set your desired initial center
    >
      {markerPositions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          animation={window.google.maps.Animation.BOUNCE}
        />
      ))}
      <Polyline
        path={polylinePath}
        strokeColor='#0000FF'
        strokeOpacity={0.8}
        strokeWeight={2}
      />
      <button onClick={animateMarkers}>Animate Markers</button>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: false,
})(SimpleMap)
