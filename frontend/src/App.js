import './App.css';
import Header from './components/header/header';
import HouseForm from './components/houseForm/houseForm';
import AddressMap from './components/addressMap/addressMap';
import { useState } from 'react';
import axiosApp from './common/api';

function App() {
    const [bedrooms, setBedrooms] = useState(1)
    const [bathrooms, setBathrooms] = useState(1)
    const [floors, setFloors] = useState(1)
    const [sqft_living, setSqft_living] = useState(1000)
    const [sqft_lot, setSqft_lot] = useState(1000)
    const [sqft_above, setSqft_above] = useState(1000)
    const [sqft_basement, setSqft_basement] = useState(1000)
    const [waterfront, setWaterfront] = useState(1)
    const [view, setView] = useState(1)
    const [condition, setCondition] = useState(1)
    const [yr_built, setYr_built] = useState(1970)
    const [yr_renovated, setYr_renovated] = useState(1970)
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [statezip, setStatezip] = useState("")
    const [country, setCountry] = useState("")
    const [errMsgs, setErrMsgs] = useState("")
    const [loading, setLoading] = useState("")
    const [price, setPrice] = useState()
    

    function handleGetPrice() {
      var currErr = "";
      var temp_yr_built
      var temp_yr_renovated
      setPrice()

      try {
        temp_yr_built = parseInt(yr_built.getFullYear())
        temp_yr_renovated = parseInt(yr_renovated.getFullYear())
      }
      catch {
        temp_yr_built = yr_built
        temp_yr_renovated = yr_renovated
      }

    if (!bedrooms || isNaN(bedrooms) || parseInt(bedrooms) > 20 || parseInt(bedrooms) < 0) {
      currErr = currErr + " enter a number of bedrooms between 0 and 20. ";
    }

    if (!bathrooms || isNaN(bathrooms) || parseInt(bathrooms) > 20 || parseInt(bathrooms) < 0) {
      currErr = currErr + " enter a number of bathrooms between 0 and 20. ";
    }

    if (!floors || isNaN(floors) || parseInt(floors) > 20 || parseInt(floors) < 0) {
      currErr = currErr + " enter a number of floors between 0 and 20. ";
    }

    if (!sqft_living || isNaN(sqft_living) || parseInt(sqft_living) > 20000 || parseInt(sqft_living) < 0) {
      currErr = currErr + " enter a number of sqft_living between 0 and 20000. ";
    }

    if (!sqft_lot || isNaN(sqft_lot) || parseInt(sqft_lot) > 20000 || parseInt(sqft_lot) < 0) {
      currErr = currErr + " enter a number of sqft_lot between 0 and 20000. ";
    }

    if (!sqft_above || isNaN(sqft_above)  || parseInt(sqft_above) > 20000 || parseInt(sqft_above) < 0) {
      currErr = currErr + " enter a number of sqft_above between 0 and 20000. ";
    }

    if (!sqft_basement || isNaN(sqft_basement)  || parseInt(sqft_basement) > 20000 || parseInt(sqft_basement) < 0) {
      currErr = currErr + " enter a number of sqft_basement between 0 and 20000. ";
    }

    if (!waterfront || isNaN(waterfront)  || parseInt(waterfront) > 1 || parseInt(waterfront) < 0) {
      currErr = currErr + " enter a number of waterfronts between 0 and 1. ";
    }

    if (!view || isNaN(view)  || parseInt(view) > 5 || parseInt(view) < 0) {
      currErr = currErr + " rate the view between 0 and 5. ";
    }

    if (!condition || isNaN(condition) || parseInt(condition) > 5 || parseInt(condition) < 0) {
      currErr = currErr + " rate the condition between 0 and 5. ";
    }

    if (temp_yr_built > temp_yr_renovated) {
      currErr = currErr + " last renovated year should be later than year built"
    }

    let curr_yr = new Date().getFullYear();

    if(temp_yr_built > curr_yr || temp_yr_renovated > curr_yr) {
      currErr = currErr + " last renovated year and year built can't be bigger than the current year"
    }
    
    if(street === "" || city === "" || statezip === "" || country === "")
    {
      currErr = currErr + " please pick an address"
    }

    setErrMsgs(currErr)

      if(currErr === "")
    {
      let data = {
        bedrooms:parseInt(bedrooms),
        bathrooms:parseInt(bathrooms),
        floors:parseInt(floors),
        sqft_living:parseInt(sqft_living),
        sqft_lot:parseInt(sqft_lot),
        sqft_above:parseInt(sqft_above),
        sqft_basement:parseInt(sqft_basement),
        waterfront:parseInt(waterfront),
        view:parseInt(view),
        condition:parseInt(condition),
        yr_built:temp_yr_built,
        yr_renovated:temp_yr_renovated,
        street:street,
        city:city,
        statezip:statezip,
        country:country
      }
      console.log(data)
      setLoading(true);
      axiosApp
        .post("/homepage", data)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setPrice(res.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    }

  return (
    <div>
      <Header />
      <div className="stripe1"></div>
      <div className="main">
        <div className='err'>{errMsgs}</div>
      <HouseForm 
      bedrooms={bedrooms} setBedrooms={setBedrooms}
      bathrooms={bathrooms} setBathrooms={setBathrooms}
      floors={floors} setFloors={setFloors}
      sqft_living={sqft_living} setSqft_living={setSqft_living}
      sqft_lot={sqft_lot} setSqft_lot={setSqft_lot}
      sqft_above={sqft_above} setSqft_above={setSqft_above}
      sqft_basement={sqft_basement} setSqft_basement={setSqft_basement}
      waterfront={waterfront} setWaterfront={setWaterfront}
      view={view} setView={setView}
      condition={condition} setCondition={setCondition}
      yr_built={yr_built} setYr_built={setYr_built}
      yr_renovated={yr_renovated} setYr_renovated={setYr_renovated}
      
      />
      <AddressMap setStreet={setStreet} setCity={setCity} setStatezip={setStatezip} setCountry={setCountry}/>
      </div>
      <br/>
      <div className='submit'>
      <div className="stripe1"></div>
       <button onClick={() => handleGetPrice()}>Get Price Prediction</button>
       <br/>
       <br/>
       {loading ? <h3 className='price'>loading...</h3> : ""}
       {price ? <h3 className='price'>Your house price is: {Math.round(price).toLocaleString("en-US")}$</h3> : ""}
      </div>
    </div>
  );
}

export default App;
