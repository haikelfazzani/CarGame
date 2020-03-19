import React from 'react';
import LocalData from '../util/LocalData';

export default function Navbar () {

  const onCreateNewCode = () => {
    LocalData.createNewCode();
  }

  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="https://github.com/haikelfazzani/react-playground"><i className="fab fa-react"></i> Reacto</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <span className="nav-link" onClick={onCreateNewCode} data-toggle="tooltip" data-placement="top" title="New code">
            <i className="fas fa-plus"></i>
          </span>
        </li>
      </ul>

      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/haikelfazzani/react-playground" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i></a>
        </li>
      </ul>

    </div>
  </nav>;
}