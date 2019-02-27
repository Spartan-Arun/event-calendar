import 'babel-polyfill'

import React,{PureComponent,Fragment} from 'react';

import '../src/App.css'

import {Calendar} from './molecules/calendar';

import {Date} from './molecules/date';

import {EventForm} from './molecules/eventForm';

import {Chunker} from './utils/chunker';

import moment from 'moment';

import _ from 'lodash';

class App extends PureComponent{
    constructor(props){
        super(props);
        this.headers = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        this.year = moment().year();
        this.month = moment().month();
        this.startDay = moment([this.year,this.month]).day();
        this.blank = ''.padEnd(this.startDay,'*');
        this.days = Chunker([...this.blank,...Array(moment().daysInMonth()).keys()],7);
        this.today = moment().format("DD");
        this.state = {
            date : moment().format("DD"),
            day : this.day[moment().day()],
            month : this.months[moment().month()],
            year : moment().format("YYYY"),
            events : [],
            eventDate : '',
            eventStartTime : '',
            eventEndTime : '',
            eventStr : '',
            selectedDate : moment().format("DD"),
            showBack:false,
            event : {
                name:'',
                desc:'',
                startTime:'',
                endTime:''
            },
            lastEventEndTime : '',
            isInvalid : false
        }

    }

    componentDidMount(){
        this.interval=setInterval(this.message,1000);
    }

    message = () =>{
        let today = moment().toDate();

        let timeKey = {
            '1':'01',
            '2':'02',
            '3':'03',
            '4':'04',
            '5':'05',
            '6':'06',
            '7':'07',
            '8':'08',
            '9':'09',
            '10':'10',
            '11':'11',
            '12':'12',
            '13':'01',
            '14':'02',
            '15':'03',
            '16':'04',
            '17':'05',
            '18':'06',
            '19':'07',
            '20':'08',
            '21':'09',
            '22':'10',
            '23':'11',
            '0':'12'
        }

        if(this.state.events.length >0 ){

            let todayEvents = _.filter(this.state.events,{date:''+this.year+'-'+this.month+'-'+this.state.date});

            let nextEvent = todayEvents.reduce((x)=>{
                let hour = x.startTime.split(':');
                if(+hour[0] === +today.getHours())
                    return x;
            });

            let time = nextEvent.startTime.split(' ')[0];

            let systemTime5 = `${timeKey[today.getHours()]}:${today.getMinutes()+5}`;

            let systemTime15 = `${timeKey[today.getHours()]}:${today.getMinutes()+15}`;

            if(time === systemTime5)
                alert('next event in 5 mins is - '+x.name);
            else if(time === systemTime15)
                alert('next event in 15 mins is - '+x.name);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    changeDate=(date)=>{
        if(date>=this.today)
            this.setState({date:date,selectedDate:date,day:this.day[moment([this.year,this.month,+date]).day()]});
    }

    flip = (e) =>{
        let flag = !this.state.showBack;
        this.setState({showBack : flag});
    }

    handleChange = (e) =>{
        let current = {...this.state.event};
        current[e.target.name] = e.target.value;
        this.setState({event:current});
    }

    saveEvent = () =>{

        let latest = this.state.events;

        if(this.state.event.name !== '' && this.state.event.startTime !== '' && this.state.event.endTime !==''){

            this.state.event.date = ''+this.year+'-'+this.month+'-'+this.state.date;

            latest.push(this.state.event);

            let lastEventEndTime = this.state.event.endTime;

            this.setState({
                events:latest,
                event:{
                    name:'',
                    desc:'',
                    startTime:'',
                    endTime:''
                },
                lastEventEndTime,
                isInvalid:false
            });

            this.flip();
        }else{
            this.setState({isInvalid:true});
        }

    }

    render(){
        let eventDate = ''+this.year+'-'+this.month+'-'+this.state.date;
        let eventsInSelectedDate = _.filter(this.state.events,{date:eventDate});
		return(
            <div>
            <div className="container">
                <div className={"card" + (this.state.showBack ? ' flipped' : '')}>
                    <div className="front">
                        <div className="contentfront">
                            <div className="month">
                                <Calendar today={this.today} headers = {this.headers} rows={this.days} startDay={this.startDay} selectedDate={this.state.selectedDate} changeDate={this.changeDate}/>
                            </div>
                            <Date {...this.state} flip={this.flip}/>
                        </div>
                    </div>   
                    <div className="back">
                        <EventForm isInvalid={this.state.isInvalid} event={this.state.event} lastEventEndTime={this.state.lastEventEndTime} handleChange ={this.handleChange} saveEvent={this.saveEvent}/>
                    </div>              
                </div>
                </div>
                <Fragment>
                <div className="events"> 
                    <h3>Events</h3>
                    { eventsInSelectedDate.length > 0 &&
                        <ul> 
                            {
                            eventsInSelectedDate.map((x,i)=>{
                                    return <li key={i}>{`${x.startTime} - ${x.endTime}: `+x.name}</li>;
                                })
                            }
                        </ul>
                    }
                    {eventsInSelectedDate.length === 0 &&
                        <p>No Events scheduled</p>
                    }
                </div>
                </Fragment>
            </div>
        );
    }
}

export default App;