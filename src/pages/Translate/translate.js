import React, { useState } from 'react';
import LanguageTranslatorV3 from 'ibm-watson/language-translator/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

import HeaderItem from '../../components/HeaderItem/HeaderItem';
import { TranslateCredentials } from '../../settings/credentials';

import './styles.css';

function Translate(){
    const [normalText, setNormalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const languageTranslator = new LanguageTranslatorV3({
        authenticator: new IamAuthenticator({ apikey: TranslateCredentials.apikey }),
        url: 'https://gateway.watsonplatform.net/language-translator/api/',
        version: '2018-08-07',
      });

    function translateText(){
        languageTranslator.translate(
            {
              text: normalText,
              source: 'en',
              target: 'pt'
            })
            .then(response => {
                setTranslatedText(JSON.stringify(response.result.translations[0].translation, null, 2));
            })
            .catch(err => {
              console.log('error: ', err);
            });        
    }

    return(
        <div className="container">
            <HeaderItem title="Translate"/>
            <main>
                <div className="form">
                    <div className="formItem">
                        <label>From (en):</label>
                        <textarea onChange={e => setNormalText(e.target.value)} cols="30" rows="5" />
                    </div>
                    <div className="formItem">
                        <label>To (pt):</label>
                        <textarea value={translatedText} cols="30" rows="5" disabled />
                    </div>
                </div>    
                <button type="button" onClick={translateText} className="buttonTranslate">
                    Translate it!
                </button>   
            </main>
        </div>
    );
}

export default Translate;