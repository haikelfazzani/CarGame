import React, { useState } from 'react';

export default function Navbar () {

  const [code, setCode] = useState();

  const downloadCode = () => {
    const dType = 'data:text/plain;charset=utf-8,';

    let codeResult = localStorage.getItem('code-result');
    codeResult = codeResult.replace('\n', '');
    setCode(dType + encodeURIComponent(codeResult));
  }

  return <nav className="w-100 d-flex">

    <a className="nav-link" href={code} onClick={downloadCode} download={'reacto.js'}>
      <i className="fas fa-download"></i>
    </a>

    <a className="nav-link" href="https://github.com/haikelfazzani/react-playground"
      target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>
  </nav>;
}