import './addressMap.css';
import { useState, useRef } from 'react';
import {GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api"


const libraries = ["places"];
export default function AddressMap({setStreet, setCity, setStatezip, setCountry}) {
  const autocompleteRef = useRef(null);
  const center = {lat:47.751076, lng:-120.740135}
  const bounds = {
    south: 45.543541,
    west: -124.848974,
    north: 49.002494,
    east: -116.916474
  };
  const [position, setPosition] = useState();
  const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_MAPS_API,  libraries:libraries})

  const handleAddress = () => {
    const place = autocompleteRef.current.getPlace();
    if(place.formatted_address) {
    let address = place.formatted_address.split(",");
    let location = place.geometry.location;
    console.log("address:", address)
    console.log("location:", location)

    if (address.length < 4) 
    alert("please enter a full address with street, city, statezip and country")
    else {
      setPosition({
        lat: location.lat(),
        lng: location.lng()
  });
  setStreet(address[0]);
  setCity(address[1]);
  setStatezip(address[2]);
  setCountry(address[3]);
    }
    }

    else {
      alert("please pick a valid address from suggestions")
    }
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="addressMap">
      <h3>Pick your house address:</h3>
      <GoogleMap
  zoom={6}
  center={center}
  mapContainerClassName='map-container'
  >
    <Autocomplete
    onLoad={autocomplete => {
      autocompleteRef.current = autocomplete;
    }}
     bounds={bounds} options={{strictBounds: true}}
    onPlaceChanged={handleAddress} >
                    <input
                        type="text"
                        placeholder="Enter full address here..."
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px",
                            top: "2%"
                        }}
                    />
                </Autocomplete>
    <Marker position={position} />
  </GoogleMap>
    </div>
  )
}

