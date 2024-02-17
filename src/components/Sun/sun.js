import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'
import Button from '../Button/Button'

import { route } from 'preact-router';

import common from '../common.less'
import style from './sun.css'
import TempBanner from '../TempBanner/TempBanner';

import diagram from '../../assets/sun_cycle.png'

export default class Sun extends Component {
	constructor(props){
		super(props);
		this.angle = 0;
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}

	// the main render method for the iphone component
	render() {
		this.calculateAngle();
		return (
			<div class={common.container}>
				<TempBanner />
				<div>
					<p className={style.title}>
						Sun Details
					</p>
				</div>
				<div>
					<div className={style.chart}>
						<div className={style.blue_box}>
							<img src={diagram} width='330' height='330' style={{ transform: `rotate(${this.angle}deg)` }}/>
							<div className={style.triangle_down}/>
						</div>
					</div>
				</div>
				<Button text="Home Page" pointer={()=>route('/')}/>
			</div>
		);
	}

	// function that calculates the angle of the image
	calculateAngle() {
		let current_time = new Date().getTime() / 1000;
		let sunrise = OWM.sunrise;
		// the aprox time for next sunrise
		let next_rise = sunrise + 86400;

		// calculate the ratio of the current time to the difference between previous sunrise and next sunrise
		let ratio = (current_time-sunrise)/(next_rise - sunrise);
		this.angle=90-ratio*360;
	}
}	