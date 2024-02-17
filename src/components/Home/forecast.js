import {h, Component} from 'preact';
import {OpenWeatherMap as OWM} from '../api'

import util from '../util'

import style from './forecastStyle'

import sunny from '../../assets/icons/sunny_day.png'
import rainy from '../../assets/icons/rainy_day.png'
import cloudy from '../../assets/icons/cloudy_day.png'

export default class Forecast extends Component{
    constructor(props){
        super(props);
    }

	componentDidMount() {
		this.interval = setInterval(() => {
            this.forceUpdate();
        }, 3 * 60 * 60 * 1000); // Weather forecast only updates every 3 hours
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

    render()
    {
        return (
            <div class={style.forecast_outer}>
                {OWM.forecast.map(item =>{
                    return (
                        <div class={style.forecast_section}>
                            <div class={style.temp}>
                                {Math.round(item.temp)}°{OWM.getDegreeUnit()}
                            </div>
                            <div>
                                {Math.round(item.prob*100)==0?<div>&nbsp;</div>:<div class={style.prob}>{Math.round(item.prob*100)+'%'}</div>}
                            </div>
                            <div>
                                {(() => {
                                    // switches icons depending on the type of weather currently occuring 
                                    switch(item.main){
                                        default:
                                            return <img src={cloudy}  width="40" height="40"alt="cloud-icon"/>
                                        case 'Rain':
                                            return <img src={rainy} width="40" height="40"alt="cloud-icon"/>
                                        case 'Clouds':
                                            return <img src={cloudy} width="40" height="40"alt="cloud-icon"/>
                                        case 'Sun':
                                            return <img src={sunny}width="40" height="40"alt="cloud-icon"/>
                                    }
                                })()}
                            </div>
                            <div class={style.time}>
                                {util.formatHourTime(item.time)}
                            </div>
                        </div>)
                })}
            </div>
        );
    }
}