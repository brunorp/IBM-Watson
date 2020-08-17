import React from 'react';

import './styles.css';

const HeaderItem = (props) => {
    return(
    <div className="headerContainer">
        <header>
            <h2>{props.title}</h2>
        </header>
    </div>
    );
}

export default HeaderItem;