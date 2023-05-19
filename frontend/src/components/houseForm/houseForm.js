import './houseForm.css';
import InputForm from './components/inputForm';
import DatePicker from "react-datepicker";

export default function HouseForm({bedrooms, setBedrooms,
    bathrooms, setBathrooms,
    floors, setFloors,
    sqft_living, setSqft_living,
    sqft_lot, setSqft_lot,
    sqft_above, setSqft_above,
    sqft_basement, setSqft_basement,
    waterfront, setWaterfront,
    view, setView,
    condition, setCondition,
    yr_built, setYr_built,
    yr_renovated, setYr_renovated}) {
    

  return (
    <div className="houseForm">
      <h3>Enter your house details:</h3>
      <br/>
      <span className='textFields'>
        <InputForm type="number" id="bedrooms" name="bedrooms" value={bedrooms} min={0} max={20} func={setBedrooms}/>
        <InputForm type="number" id="bathrooms" name="bathrooms" value={bathrooms} min={0} max={20} func={setBathrooms}/>
        <InputForm type="number" id="floors" name="floors" value={floors} min={0} max={20} func={setFloors}/>   
        <InputForm type="number" id="sqft_living" name="sqft_living" value={sqft_living} min={0} max={20000} func={setSqft_living}/>
        <InputForm type="number" id="sqft_lot" name="sqft_lot" value={sqft_lot} min={0} max={20000} func={setSqft_lot}/>
        <InputForm type="number" id="sqft_above" name="sqft_above" value={sqft_above} min={0} max={20000} func={setSqft_above}/>
        <InputForm type="number" id="sqft_basement" name="sqft_basement" value={sqft_basement} min={0} max={20000} func={setSqft_basement}/>
        <InputForm type="number" id="waterfront" name="waterfront" value={waterfront} min={0} max={1} func={setWaterfront}/>
        <InputForm type="number" id="view" name="view" value={view} min={0} max={5} func={setView}/>
        <InputForm type="number" id="condition" name="condition" value={condition} min={0} max={5} func={setCondition}/>
        <br/>
        </span>
        <span className='yearPicker'>
        <label className="formLabel" for="yr_built">yr_built</label>
        <DatePicker
        selected={yr_built}
        onChange={(date) => setYr_built(date)}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={4}
        required
        />
        <br/>
        <label className="formLabel bottomYr" for="yr_renovated">yr_renovated</label>
        <DatePicker
        selected={yr_renovated}
        onChange={(date) => setYr_renovated(date)}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={4}
        required
        />
        </span>
    </div>
  )
}
