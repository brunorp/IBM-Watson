import React, { useState } from 'react';

import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import HeaderItem from '../../components/HeaderItem/HeaderItem';

import { NLUCredentials } from '../../settings/credentials';

import './styles.css';

function NLU(){
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [keywords, setKeywords] = useState('');
    const [concepts, setConcepts] = useState('');
    const [language, setLanguage] = useState('');

    const nlu = new NaturalLanguageUnderstandingV1({
        authenticator: new IamAuthenticator({ apikey: NLUCredentials.apikey }),
        version: '2018-04-05',
        url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
    });
    
    function nluText(){
        let keywords = '';
        let concepts = '';
        nlu.analyze(
            {
              html: text, 
              features: {
                concepts: {},
                sentiment: {},
                keywords: {}
              }
            })
            .then(response => {
                setSentiment(JSON.stringify(response.result.sentiment.document.label, null, 2));
                setLanguage(JSON.stringify(response.result.language, null, 2));
                response.result.keywords.map(keyword => {
                    keywords += keyword.text+"; ";
                });
                setKeywords(JSON.stringify(keywords, null, 2));
                response.result.concepts.map(concept => {
                    concepts += concept.text+"; ";
                });
                setConcepts(JSON.stringify(concepts, null, 2));
                console.log(JSON.stringify(response.result, null, 2));
            })
            .catch(err => {
              console.log('error: ', err);
            });
    }

    return(
        <div className="container">
            <HeaderItem title="Natural Language Classifier"/>
            <main>
                <div className="form">
                    <div className="formItem">
                        <label>Text:</label>
                        <textarea onChange={e => setText(e.target.value)} cols="30" rows="5" />
                    </div>
                    <button type="button" onClick={nluText} className="buttonSubmit">
                        Go!
                    </button>   
                </div>
                <div className="result">
                    <label>Sentiment: {sentiment} </label>
                    <label>Language: {language} </label>
                    <label>Keywords: {keywords} </label>
                    <label>Concepts: {concepts} </label>
                </div> 
            </main>
        </div>
        
    );
}

export default NLU;