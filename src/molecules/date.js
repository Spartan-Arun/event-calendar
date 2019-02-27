import 'babel-polyfill';

import React from 'react';

export const Date = React.memo((props) =>(          
    <div className="date">
        <div className="datecont">
            <div id="date">{props.date}</div>
            <div id="day">{props.day}</div>
            <div id="month">{props.month+'/'+props.year}</div>
            <a onClick={(e)=>props.flip(e)}><i className="fa fa-plus-square edit" aria-hidden="true" ></i></a>
        </div>
    </div>
));