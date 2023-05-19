import './header.css';

export default function Header() {
  return (
    <div className="header">
      <img src="/img/house-icon.png"></img>
      &nbsp;
      &nbsp;
      <span className="title">house price prediction</span>
      <span className="subtitle">predict house prices in Washington state</span>
      <br/>
      <br/>
      <hr/>
    </div>
  )
}
