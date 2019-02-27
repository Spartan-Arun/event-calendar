import 'babel-polyfill';

import React from 'react';

export const Rows = React.memo((props)=>(
    <tr className="whiteTr">
        {
           props.rowData.map((date,i)=>{
                if(date !=='*')
                    return <th key={i} className={+props.selectedDate === date+1 ? 'bold':'' +(date+1>=props.today?'':'disabled')}><a onClick={(e)=>props.changeDate(date+1)}>{date+1}</a></th>;
                else
                    return <th key={i} className="disabled">{date}</th>;
            })
        }
    </tr>
));