export default function InputForm({type, id, name, value, min, max, func}) {
  return (
    <div>
    <label className="formLabel" for={id}>{name}</label>
    <input  className="formInput" 
    type={type} id={id} name={name} value={value}
    min={min} max={max} onChange={(e) => func(e.target.value)} required/>
    <br/>
    <br/>
    </div>
  )
}
