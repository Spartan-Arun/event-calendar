import React,{Fragment} from 'react';

import {startTime,endTime,defaultStart} from '../const/time';

export const EventForm = React.memo((props)=>(

    <Fragment>
        <input type="text" value={props.event.name} name="name" onChange={(e)=>props.handleChange(e)} placeholder="Event Name" required/><br/><br/>
        {props.isInvalid && props.event.name === ''&&<div className="error">*Enter event name.</div>}  
        <select value={props.event.startTime} onChange={(e)=>props.handleChange(e)} required name="startTime">
            <option disabled selected>Start time</option>
            {
                props.lastEventEndTime === '' ? 

                defaultStart.map((val,i)=>{return <option value={val} key={i}>{val}</option>;}) :

                startTime[props.lastEventEndTime].map((val,i)=>{return <option value={val} key={i}>{val}</option>;})
            }
            
        </select>&nbsp;
        
        <select value={props.event.endTime} onChange={(e)=>props.handleChange(e)} required name="endTime">
            <option disabled selected >End time</option>
            {props.event.startTime !== '' &&
                endTime[props.event.startTime].map((val,i)=>{return <option value={val} key={i}>{val}</option>;})
            }
        </select><br/>

        {props.isInvalid && (props.event.startTime === '' || props.event.endTime === '' ) &&<div className="error">*Enter start time and end time properly.</div>}  

        <input type="button" onClick={()=>props.saveEvent()} value="Submit"/><br/>
    </Fragment>

));