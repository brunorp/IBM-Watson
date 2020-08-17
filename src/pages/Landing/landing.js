import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Landing(){
  return(
    <div className="landing-page">
      <header>
        <h2>IBM Watson</h2>
      </header>
      <div className="form"> 
        <Link to="/translate" className="translate">
          Translate
        </Link>
        <Link to="/nlu" className="nlu">
          Natural Language Classifier
        </Link>
      </div>
    </div>
  );
}

export default Landing;

