import 'babel-polyfill';

import React from 'react';

import {Headers} from '../atoms/headers';

import {Rows} from '../atoms/rows';

export const Calendar = React.memo((props)=>(

    <table>
        <thead>
            <Headers {...props}/>
        </thead>
        <tbody>

            {props.rows.map((row)=>{
                    return <Rows today={props.today} rowData = {row} selectedDate={props.selectedDate} changeDate = {props.changeDate}/>;
                })
            }

        </tbody>
        
    </table>

));