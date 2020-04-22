import React, { useState } from 'react'
import axios from 'axios'
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
// import SinkholeAverageRating from './SinkholeAverageRating'
import PlaceSinkhole from '../images/placeholder_sinkhole.jpg'

const Sinkhole = props => {
  const { sinkhole } = props
  const [viewport, setViewport] = useState({
    height: 400,
    width: 400,
    // need to change width
    latitude: sinkhole.latitude,
    longitude: sinkhole.longitude,
    zoom: 12,
  })
  const [showPopup, setShowPopup] = useState(false)
  const markerClicked = sinkhole => {
    console.log('sinkhole clicked', sinkhole)
    setShowPopup(true)
  }
  // const [markers, setMarkers] = useState([])

  // const [newReviewText, setNewReviewText] = useState('')
  // const [reviewScore, setReviewScore] = useState(0)
  // const [reviews, setReviews] = useState(Sinkhole.reviews)

  // const sendReviewToApi = async () => {
  //   const resp = await axios.post(`/api/Sinkholes/${Sinkhole.id}/reviews`, {
  //     rating: reviewScore,
  //     comment: newReviewText,
  //   })
  //   console.log(resp.data)
  //   // update state with  the new data
  //   setReviews([resp.data, ...reviews])
  // }

  // const saveSinkholeForUser = async () => {
  //   // tell our API 2 things,
  //   // Who is bookmarking the Sinkhole
  //   // what Sinkhole are we bookmarking
  //   const resp = await axios.post(
  //     `/api/bookmark/${Sinkhole.id}`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     }
  //   )
  // }

  return (
    <main className="sinkhole-details">
      <img src={PlaceSinkhole} alt="Huh" />
      <section className="sinkhole-header">
        <h2>Details for {sinkhole.name}</h2>

        {/* <button className="directions-link">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </button> */}
        <p>Description: {sinkhole.description}</p>
        <p className="coordinates">
          Coordinates (Latitude/Longitude): {sinkhole.latitude}{' '}
          {sinkhole.longitude}
        </p>
        {/* <p className="reviews">
          <SinkholeAverageRating reviews={reviews} />
        </p> */}
        <p className="address">Address: {sinkhole.fullAddress}</p>
        <p>County: {sinkhole.county}</p>
        <section className="map-container">
          <h2>{sinkhole.name} location</h2>
          <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={
              'pk.eyJ1IjoicmtpbGR1ZmYiLCJhIjoiY2s4czZna2lxMDFweDNsbzlyMmU0Ym50byJ9.DW5QkRiAEI4c4dEfA2eHyw'
            }
          >
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            ></GeolocateControl>
            >
            {showPopup && (
              <Popup
                latitude={sinkhole.latitude}
                longitude={sinkhole.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
                offsetTop={-5}
              >
                <div className="popup-window">🚩{sinkhole.name}</div>
              </Popup>
            )}
            <Marker
              latitude={sinkhole.latitude}
              longitude={sinkhole.longitude}
              key={sinkhole.id}
              name={sinkhole.name}
            >
              <div onClick={() => markerClicked(sinkhole)}>🕳</div>
              {/* <div>🕳</div> */}
            </Marker>
            <NavigationControl />
          </ReactMapGL>
        </section>
        <section className="review">
          <p>Is this a sinhole?</p>
          <button>Yes!</button>
          <button>Fake News!</button>
        </section>
      </section>
    </main>
  )
}

export default Sinkhole
