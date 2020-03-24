import React, { useState, useContext } from 'react';
import logo from '../img/logo192.png';
import GlobalContext from '../providers/GlobalContext';

export default function Navbar () {

  const { state, setState } = useContext(GlobalContext)
  const [code, setCode] = useState();

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';

    let codeResult = localStorage.getItem('code-result');
    codeResult = codeResult.replace('\n', '');
    setCode(dType + encodeURIComponent(codeResult));
  }

  const onThemeChange = (e) => {
    setState({ ...state, theme: e.target.value })
  }

  return <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <div className="navbar-brand">
      <img src={logo} alt=".." width="30" height="30" className="d-inline-block align-top" /> Reacto
    </div>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto"></ul>

      <ul className="navbar-nav">

        <li className="nav-item">
          <select className="nav-link" onChange={onThemeChange}>
            <option value="material">material</option>
            <option value="monokai">monokai</option>
            <option value="mdn-like">mdn-like</option>
          </select>
        </li>

        <li className="nav-item">
          <div className="nav-link">
            <span className="badge badge-secondary">
              <i className="fas fa-clock"></i> {new Date().toString().slice(0, 15)}
            </span>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}>
            <i className="fas fa-download"></i>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
            target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
      </ul>

    </div>
  </nav>;
}