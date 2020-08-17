import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing/landing';
import NLU from './pages/NLU/nlu';
import Translate from './pages/Translate/translate';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/translate" component={Translate} />
            <Route path="/nlu" component={NLU} />
        </BrowserRouter>
    )
}

export default Routes;