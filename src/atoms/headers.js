import React from 'react';

export const Headers = React.memo((props)=>(
    <tr className="orangeTr">
        {
           props.headers.map((heading,i)=>{
               return <th key={i}>{heading}</th>;
            })
        }
    </tr>
));