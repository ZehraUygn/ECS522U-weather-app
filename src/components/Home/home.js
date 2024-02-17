import {h, Component} from 'preact';

import { route } from 'preact-router';

import {OpenWeatherMap as OWM} from '../api'
import Button from '../Button/Button'
import Forecast from './forecast'

import style from './homeStyle';
import util from '../util.js'
// import images
import rain from '../../assets/icons/rain.png';
import clarity from '../../assets/icons/clarity.png';
import rainy from '../../assets/icons/rainy_day.png'
import pressure from '../../assets/icons/pressure.png';
import humidity from '../../assets/icons/humidity.png';
import visibility from '../../assets/icons/visibility.png';
import sun from '../../assets/icons/sunny_day.png';
import wind from '../../assets/icons/sunny_day.png';

export default class Home extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}

	// the main render method for the home page component
	render() {
		return (
			<div class={style.container}>
					<p class={style.city_text}>{OWM.city}</p>
					<table class={style.temp_table}>
						<tr>
							<td>
								{ /*html for temp */}
								<p class={style.temperature}>
									{Math.round(OWM.temp)}
									<p class={style.temp_unit}>°{OWM.getDegreeUnit()}</p>
								</p>
							</td>
							<td class={style.td_center}>
								{this.renderCurrentWeatherImage()}
								<p class={style.clarity}>{OWM.clarity}</p>
								
							</td>
							<td class={style.td_center}>
								<img class={style.rain_img}  src={rain}  width="50" height="50"alt="rain-icon"/>
								<p class={style.rain}>{OWM.rain?0:OWM.rain}%</p>
							</td>
						</tr>
					</table>
					
					<p class={style.sunset}>Sunset | {util.formatTime(OWM.sunset)}</p>
					<p class={style.sunset}>Day length | {util.getTimeDelta(OWM.sunset, OWM.sunrise)}</p>


					<div class={ style.forecast }>
						<div>
							<p>NEXT 24 HOURS</p>
						</div>
						<Forecast/>
					</div>
					
					{/*// displays the values for the visibility, humidity and pressure*/}

					<div class={style.weatherDetails}>
						<div class={style.inner_detail_div}>
						    <img src={visibility}  width="30" height="30"/>
							<p>Visibility</p>
							<p class={style.value}>{Math.round(OWM.visibility/1609)}mi</p>
						</div>
						<div class={style.inner_detail_div}>
							<img src={humidity}  width="30" height="30"/>
							<p>Humidity</p>
							<p class={style.value}>{OWM.humidity}%</p>
					    </div>
						<div class={style.inner_detail_div}>
							<img src={pressure}  width="30" height="30"/>
						    <p>Pressure</p>
							<p class={style.value}>{OWM.pressure}mb</p>
					    </div>
					</div>

				{/* button prompts for switching pages*/}

				<Button text="Morning details | Evening details" pointer={()=>route('/time')}/>
				<Button text="Sun details" pointer={()=>route('/sun')}/>
				<Button text="Moon cycle" pointer={()=>route('/moon')}/>
			</div>
		);
	}

	renderCurrentWeatherImage()
	{
		switch(OWM.desc)
		{
			default:
				return <img class={style.clarity_img} src={clarity} width="50" height="50" alt="cloud-icon"/>
			case "Rain":
				return <img class={style.clarity_img} src={rainy} style={{filter: "brightness(0) contrast(100)"}} width="50" height="50" alt="cloud-icon"/>
			case "Sun":
				return <img class={style.clarity_img} src={clarity} style={{filter: "brightness(0) contrast(100)"}} width="50" height="50" alt="cloud-icon"/>
		}
	}
}